import { getHealthCategoryConfigs, getRelevantEndpoints, HealthCategoryConfig } from '$/config';
import { HealthcareOrganization } from '$/store';
import { DataService } from '$/store/organizations/normalize';
import { faker } from '$test/faker';
import { Query, QueryCache, QueryFilters } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import { beforeEach, expect, test, vi } from 'vitest';
import { getFailedHealthQueryHashes } from './getFailedHealthQueryHashes';

const hoisted = vi.hoisted(() => {
    return {
        getRelevantEndpoints: vi.fn<typeof getRelevantEndpoints>(() => []),
    };
});

vi.mock('../../config/getRelevantEndpoints/getRelevantEndpoints', async (importOriginal) => {
    const mod =
        await importOriginal<
            typeof import('../../config/getRelevantEndpoints/getRelevantEndpoints')
        >();
    return {
        ...mod,
        getRelevantEndpoints: hoisted.getRelevantEndpoints,
    };
});

function createQueryCacheMock(cachedQueries: PartialDeep<Query>[]): QueryCache {
    return {
        findAll: (filter: QueryFilters) => (cachedQueries as Query[]).filter(filter.predicate!),
    } as QueryCache;
}

beforeEach(() => {
    vi.resetAllMocks();
});

test('retrieves failed queries by status, fetchStatus and partial query key, defaults to all categories', async () => {
    const endpoint1 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };
    const endpoint2 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };

    const cachedQueries: PartialDeep<Query>[] = [
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint1.dataServiceId, endpoint1.endpointId],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', faker.string.uuid(), faker.string.uuid()],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint2.dataServiceId, endpoint2.endpointId],
            state: { fetchStatus: 'paused' },
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue([endpoint1, endpoint2]);

    const organizationsFilter: HealthcareOrganization[] = [];
    const categoriesFilter: HealthCategoryConfig[] = [];

    const result = getFailedHealthQueryHashes(createQueryCacheMock(cachedQueries), {
        organizationsFilter,
        categoriesFilter,
    });
    const expected = [cachedQueries[0].queryHash, cachedQueries[2].queryHash];

    const allCategories = getHealthCategoryConfigs();

    expect(hoisted.getRelevantEndpoints).toHaveBeenCalledWith(allCategories);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expected);
});

test('retrieves failed queries by status and partial query key, defaults to all categories, filtered by organization', async () => {
    const endpoint1 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };
    const endpoint2 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };

    const organization = faker.custom.healthcareOrganization({
        dataServices: [
            {
                id: endpoint1.dataServiceId,
                resourceEndpoint: faker.internet.url(),
            },
        ] as DataService[],
    });

    const cachedQueries: PartialDeep<Query>[] = [
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint1.dataServiceId, endpoint1.endpointId, organization.id],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', faker.string.uuid(), faker.string.uuid()],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint2.dataServiceId, endpoint2.endpointId],
            state: { status: 'error' },
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue([endpoint1, endpoint2]);

    const organizationsFilter: HealthcareOrganization[] = [organization];
    const categoriesFilter: HealthCategoryConfig[] = [getHealthCategoryConfigs()[0]];

    const result = getFailedHealthQueryHashes(createQueryCacheMock(cachedQueries), {
        organizationsFilter,
        categoriesFilter,
    });

    const expected = [cachedQueries[0].queryHash];

    expect(hoisted.getRelevantEndpoints).toHaveBeenCalledWith(categoriesFilter);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expected);
});
