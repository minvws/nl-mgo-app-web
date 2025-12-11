import { renderHook } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import {
    type DataServiceEndpointConfig,
    type HealthCategoryConfig,
    type SubHealthCategoryConfig,
} from '$/config';
import { Resource, useStore } from '$/store';
import { faker } from '$test/faker';
import { useHealthCategoriesQuery } from './useHealthCategoriesQuery';

const hoisted = vi.hoisted(() => {
    return {
        useHealthCategoriesQueries: vi.fn(),
        getDataServiceEndpointConfig: vi.fn(
            (_dataServiceId: string, _endpointId: string) =>
                ({}) as Partial<DataServiceEndpointConfig> | undefined
        ),
        invalidateQueries: vi.fn(),
        useSyncedQueries: vi.fn(
            (x: Parameters<(typeof import('./useSyncedQueries'))['useSyncedQueries']>[0]) => x
        ),
    };
});

vi.mock('@tanstack/react-query', async () => {
    const actual =
        await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
        ...actual,
        useQueryClient: () => ({
            invalidateQueries: hoisted.invalidateQueries,
        }),
    };
});

vi.mock('./useHealthCategoriesQueries', () => {
    return {
        useHealthCategoriesQueries: hoisted.useHealthCategoriesQueries,
    };
});

vi.mock('./useSyncedQueries', () => {
    return { useSyncedQueries: hoisted.useSyncedQueries };
});

vi.mock('$/config', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/config')>();
    return {
        ...mod,
        getDataServiceEndpointConfig(dataServiceId: string, endpointId: string) {
            return hoisted.getDataServiceEndpointConfig(dataServiceId, endpointId);
        },
    };
});

type MinimalQueryConfig = {
    queryKey: unknown[];
    meta: { dataServiceId: string; endpointId: string };
};

function mockSubcategoryConfig(profiles?: string[]): SubHealthCategoryConfig {
    return {
        heading: faker.lorem.word(),
        profiles: profiles ?? [faker.lorem.word()],
    };
}

function mockHealthCategoryConfig(subcategories?: SubHealthCategoryConfig[]): HealthCategoryConfig {
    return {
        id: faker.string.uuid(),
        icon: faker.lorem.word(),
        heading: faker.lorem.word(),
        subheading: faker.lorem.word(),
        subcategories: subcategories ?? [mockSubcategoryConfig()],
    };
}

function mockQueryConfig({ endpointId }: { endpointId?: string } = {}): MinimalQueryConfig {
    return {
        queryKey: [faker.lorem.word()],
        meta: {
            dataServiceId: faker.string.uuid(),
            endpointId: endpointId ?? faker.string.uuid(),
        },
    };
}

beforeEach(() => {
    vi.resetAllMocks();
});

test('returns one result per category', async () => {
    const profileA = faker.lorem.word();
    const profileB = faker.lorem.word();

    const categoryA = mockHealthCategoryConfig([mockSubcategoryConfig([profileA])]);
    const categoryB = mockHealthCategoryConfig([mockSubcategoryConfig([profileB])]);

    const categories = [categoryA, categoryB];
    const organizations = [faker.custom.healthcareOrganization()];

    const queryConfigA = mockQueryConfig({ endpointId: 'ep-1' });
    const queryConfigB = mockQueryConfig({ endpointId: 'ep-2' });

    hoisted.useHealthCategoriesQueries.mockReturnValue([queryConfigA, queryConfigB]);

    hoisted.getDataServiceEndpointConfig.mockImplementation((_ds: string, endpointId: string) => {
        if (endpointId === 'ep-1') return { profiles: [profileA] };
        if (endpointId === 'ep-2') return { profiles: [profileB] };
        return { profiles: [] };
    });

    hoisted.useSyncedQueries.mockImplementation((queries) => {
        return queries.map((query) => {
            return {
                ...query,
                isSynced: query.queryKey === queryConfigA.queryKey,
                isError: query.queryKey === queryConfigB.queryKey,
            };
        });
    });

    const { result } = renderHook(() => useHealthCategoriesQuery({ categories, organizations }));

    expect(result.current).toHaveLength(2);

    const [resA, resB] = result.current;
    expect(resA.category.id).toBe(categoryA.id);
    expect(resB.category.id).toBe(categoryB.id);

    expect(resA.isLoading).toBe(false);
    expect(resA.isError).toBe(false);

    expect(resB.isLoading).toBe(false);
    expect(resB.isError).toBe(true);

    resA.retry();

    expect(hoisted.invalidateQueries).toHaveBeenCalledWith({
        queryKey: queryConfigA.queryKey,
    });
    expect(hoisted.invalidateQueries).not.toHaveBeenCalledWith({
        queryKey: queryConfigB.queryKey,
    });
});

test('returns the resources from the store in the category format', async () => {
    const state = useStore.getState();
    const mockGetResourcesByProfiles = vi.spyOn(state, 'getResourcesByProfiles');
    const category = mockHealthCategoryConfig();
    const categories = [category];
    const organizations = [faker.custom.healthcareOrganization()];
    hoisted.useHealthCategoriesQueries.mockReturnValue([mockQueryConfig()]);

    hoisted.getDataServiceEndpointConfig.mockImplementation(() => {
        return {
            profiles: category.subcategories.flatMap((subcategory) => subcategory.profiles),
        };
    });

    mockGetResourcesByProfiles.mockImplementation(() => {
        return [{}, {}] as Resource[];
    });

    const {
        result: {
            current: [query],
        },
    } = renderHook(() => useHealthCategoriesQuery({ categories, organizations }));

    expect(query.isEmpty).toBe(false);
    expect(mockGetResourcesByProfiles).toHaveBeenCalledWith(
        category.subcategories[0].profiles,
        organizations
    );
    expect(query.category.subcategories[0].resources.length).toBe(2);
});

test('returns whether the category is empty', async () => {
    const state = useStore.getState();
    const mockGetResourcesByProfiles = vi.spyOn(state, 'getResourcesByProfiles');
    const category = mockHealthCategoryConfig();
    const categories = [category];
    const organizations = [faker.custom.healthcareOrganization()];
    hoisted.useHealthCategoriesQueries.mockReturnValue([mockQueryConfig()]);

    hoisted.getDataServiceEndpointConfig.mockImplementation(() => {
        return {
            profiles: category.subcategories.flatMap((subcategory) => subcategory.profiles),
        };
    });

    mockGetResourcesByProfiles.mockImplementation(() => {
        return [] as Resource[];
    });

    const {
        result: {
            current: [query],
        },
    } = renderHook(() => useHealthCategoriesQuery({ categories, organizations }));

    expect(query.isEmpty).toBe(true);
    expect(query.category.subcategories[0].resources.length).toBe(0);
});

test('throws if the data service endpoint config can not be found (should never happen)', async () => {
    const category = mockHealthCategoryConfig();
    const categories = [category];
    const organizations = [faker.custom.healthcareOrganization()];
    const queryConfig = mockQueryConfig();
    hoisted.useHealthCategoriesQueries.mockReturnValue([queryConfig]);
    hoisted.getDataServiceEndpointConfig.mockImplementation(() => undefined);

    vi.spyOn(console, 'error').mockImplementation(vi.fn());
    expect(() =>
        renderHook(() => useHealthCategoriesQuery({ categories, organizations }))
    ).toThrowError(
        `Endpoint config not found for data service ${queryConfig.meta.dataServiceId} and endpoint ${queryConfig.meta.endpointId}`
    );
});
