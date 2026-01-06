import { beforeEach, expect, test, vi } from 'vitest';

import { getHealthCategoryConfigs, getRelevantEndpoints } from '$/config';
import { faker } from '$test/faker';
import { Query, QueryCache, QueryFilters } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { PartialDeep } from 'type-fest';
import { useFailedHealthQueries } from './useFailedHealthQueries';

const hoisted = vi.hoisted(() => {
    let cachedQueries = [] as Query[];
    const queryCache = {
        findAll: (filter: QueryFilters) => cachedQueries.filter(filter.predicate!),
        subscribe: (onStoreChange: () => void) => {
            onStoreChange();
            return () => {};
        },
    } as QueryCache;

    return {
        getRelevantEndpoints: vi.fn<typeof getRelevantEndpoints>(() => []),
        getQueryCache: () => queryCache,
        setCachedQueries: (queries: PartialDeep<Query>[]) => {
            cachedQueries = queries as Query[];
        },
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

vi.mock('@tanstack/react-query', async () => {
    const actual =
        await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
        ...actual,
        useQueryClient: () => ({
            getQueryCache: () => hoisted.getQueryCache(),
        }),
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

test('retrieves failed queries by status and partial query key, defaults to all categories', async () => {
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
            state: { status: 'error' },
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue([endpoint1, endpoint2]);
    hoisted.setCachedQueries(cachedQueries);

    const { result } = renderHook(() => useFailedHealthQueries());
    const expected = [cachedQueries[0].queryHash, cachedQueries[2].queryHash].sort();
    const allCategories = getHealthCategoryConfigs();

    expect(hoisted.getRelevantEndpoints).toHaveBeenCalledWith(allCategories);
    expect(result.current.length).toBe(expected.length);
    expect(result.current).toEqual(expected);
});

test('ignores queries that are not failed', async () => {
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
            state: { status: 'success' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', faker.string.uuid(), faker.string.uuid()],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint2.dataServiceId, endpoint2.endpointId],
            state: { status: 'pending' },
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue([endpoint1, endpoint2]);
    hoisted.setCachedQueries(cachedQueries);

    const { result } = renderHook(() => useFailedHealthQueries());
    expect(result.current.length).toBe(0);
});

test('can retrieve failed queries for specific organizations and categories', async () => {
    const endpoint1 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };
    const endpoint2 = {
        dataServiceId: faker.string.uuid(),
        endpointId: faker.string.uuid(),
    };

    const category = getHealthCategoryConfigs()[0];
    const organization = faker.custom.healthcareOrganization({
        dataServices: [
            {
                id: endpoint1.dataServiceId,
                resourceEndpoint: faker.internet.url(),
            },
        ],
    });

    const cachedQueries: PartialDeep<Query>[] = [
        {
            queryHash: faker.string.uuid(),
            queryKey: ['health', endpoint1.dataServiceId, endpoint1.endpointId, organization.id],
            state: { status: 'error' },
        },
        {
            queryHash: faker.string.uuid(),
            queryKey: [
                'health',
                endpoint2.dataServiceId,
                endpoint2.endpointId,
                faker.string.uuid(),
            ],
            state: { status: 'error' },
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue([endpoint1, endpoint2]);
    hoisted.setCachedQueries(cachedQueries);

    const { result } = renderHook(() =>
        useFailedHealthQueries({
            categories: [category],
            organizations: [organization],
        })
    );
    const expected = [cachedQueries[0].queryHash];

    expect(result.current.length).toBe(expected.length);
    expect(result.current).toEqual(expected);
});
