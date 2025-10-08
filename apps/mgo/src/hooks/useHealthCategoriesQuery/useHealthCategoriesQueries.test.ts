import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { SubHealthCategoryConfig, type HealthCategoryConfig } from '$/config';
import { useStore } from '$/store';
import { faker } from '$test/faker';
import { MgoResource } from '@minvws/mgo-hcim';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { useHealthCategoriesQueries } from './useHealthCategoriesQueries';

function mockSubcategoryConfig(profiles?: string[]): SubHealthCategoryConfig {
    return {
        heading: faker.lorem.word(),
        profiles:
            profiles ??
            mockArray({
                max: 10,
                factory: () => faker.lorem.word(),
            }),
    };
}

function mockHealthCategoryConfig(subcategories?: SubHealthCategoryConfig[]): HealthCategoryConfig {
    return {
        id: faker.string.uuid(),
        icon: faker.lorem.word(),
        heading: faker.lorem.word(),
        subheading: faker.lorem.word(),
        subcategories:
            subcategories ??
            mockArray({
                max: 6,
                factory: () => mockSubcategoryConfig(),
            }),
    };
}

type HealthCategoryQuery = ReturnType<typeof import('./createHealthQuery').createHealthQuery>;

function mockHealthCategoryQuery(): HealthCategoryQuery {
    return {
        queryKey: [faker.lorem.word()],
        queryFn: vi.fn(async () => [] as MgoResource[]),
    } as unknown as HealthCategoryQuery;
}

const hoisted = vi.hoisted(() => {
    return {
        createHealthQueries: vi.fn(
            (() => []) as typeof import('./createHealthQueries').createHealthQueries
        ),
    };
});

vi.mock('./createHealthQueries', () => {
    return { createHealthQueries: hoisted.createHealthQueries };
});

test('creates queries for all health category profiles and assigns the health category id to the query key', () => {
    const categories = [mockHealthCategoryConfig(), mockHealthCategoryConfig()];
    const organizations = [faker.custom.healthcareOrganization()];

    hoisted.createHealthQueries.mockImplementation(() => {
        return mockArray({
            max: 5,
            factory: () => mockHealthCategoryQuery(),
        });
    });

    renderHook(() =>
        useHealthCategoriesQueries({
            categories,
            organizations,
        })
    );

    for (const category of categories) {
        expect(hoisted.createHealthQueries).toHaveBeenCalledWith({
            profiles: category.subcategories.flatMap((subcategory) => subcategory.profiles),
            organizations,
        });
    }
});

test('deduplicates resulting queries by query key', () => {
    const categories = [mockHealthCategoryConfig(), mockHealthCategoryConfig()];
    const organizations = [faker.custom.healthcareOrganization()];

    const queryKey = [faker.lorem.word()];
    hoisted.createHealthQueries.mockImplementation(() => {
        return mockArray({
            min: 2,
            max: 10,
            factory: () => ({
                ...mockHealthCategoryQuery(),
                queryKey,
            }),
        });
    });

    const { result } = renderHook(() =>
        useHealthCategoriesQueries({
            categories,
            organizations,
        })
    );

    expect(result.current).toHaveLength(1);
});

test('syncs results to the store using the query config meta', () => {
    const store = useStore.getState();
    const syncResourcesSpy = vi.spyOn(store, 'syncResources');
    syncResourcesSpy.mockImplementation(() => {});

    const categories = [mockHealthCategoryConfig()];
    const organizations = [faker.custom.healthcareOrganization()];
    const queryConfig = mockHealthCategoryQuery();
    queryConfig.meta = {
        organizationId: faker.string.uuid(),
        dataServiceId: faker.string.uuid(),
        endpointId: faker.lorem.word(),
        resourceEndpoint: faker.internet.url(),
    };
    hoisted.createHealthQueries.mockImplementation(() => [queryConfig]);

    const { result } = renderHook(() =>
        useHealthCategoriesQueries({
            categories,
            organizations,
        })
    );
    const mgoResources = [{}, {}] as MgoResource[];
    result.current[0]?.onSync?.(mgoResources);

    const expectedSource = {
        organizationId: queryConfig.meta.organizationId,
        dataServiceId: queryConfig.meta.dataServiceId,
        endpointId: queryConfig.meta.endpointId,
    };
    expect(syncResourcesSpy).toHaveBeenCalledWith(expectedSource, mgoResources);
});
