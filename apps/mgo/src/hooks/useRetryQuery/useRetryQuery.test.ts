import { beforeEach, expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import { Query, QueryCache, QueryFilters } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { PartialDeep } from 'type-fest';
import { useRetryQuery } from './useRetryQuery';

const hoisted = vi.hoisted(() => {
    let cachedQueries = [] as Query[];
    const triggerStoreChange = vi.fn<() => void>();
    const queryCache = {
        findAll: (filter: QueryFilters) => cachedQueries.filter(filter.predicate!),
        subscribe: (onStoreChange: () => void) => {
            triggerStoreChange.mockImplementation(onStoreChange);
            triggerStoreChange();
            return () => {};
        },
        get: (queryHash: string) => cachedQueries.find((query) => query.queryHash === queryHash),
    } as QueryCache;

    return {
        triggerStoreChange,
        getQueryCache: () => queryCache,
        setCachedQueries: (queries: PartialDeep<Query>[]) => {
            cachedQueries = queries as Query[];
        },
        getCachedQueries: () => cachedQueries,
    };
});

vi.mock('@tanstack/react-query', async () => {
    const actual =
        await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
        ...actual,
        useQueryClient: () => ({
            getQueryCache: () => hoisted.getQueryCache(),
            refetchQueries: vi.fn((filter: QueryFilters) => {
                const queries = hoisted.getCachedQueries().filter(filter.predicate!);
                queries.forEach((query) => {
                    query.state.fetchStatus = 'fetching';
                });
            }),
        }),
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

test('triggers retry when for selected queries and returns isRetrying status', async () => {
    const cachedQueries = [
        {
            queryHash: faker.string.uuid(),
            state: { fetchStatus: 'idle' },
        },
        {
            queryHash: faker.string.uuid(),
            state: { fetchStatus: 'idle' },
        },
        {
            queryHash: faker.string.uuid(),
            state: { fetchStatus: 'idle' },
        },
    ] satisfies PartialDeep<Query>[];

    hoisted.setCachedQueries(cachedQueries);

    const { result } = renderHook(() => useRetryQuery());
    hoisted.triggerStoreChange();

    expect(result.current.isRetrying).toBe(false);

    result.current.retry([cachedQueries[0].queryHash]);
    hoisted.triggerStoreChange();

    await waitFor(() => expect(result.current.isRetrying).toBe(true));

    cachedQueries[0].state.fetchStatus = 'idle';
    hoisted.triggerStoreChange();

    await waitFor(() => expect(result.current.isRetrying).toBe(false));
});

test('does not do anything if the hashes are empty', async () => {
    const cachedQueries = [
        {
            queryHash: faker.string.uuid(),
            state: { fetchStatus: 'idle' },
        },
        {
            queryHash: faker.string.uuid(),
            state: { fetchStatus: 'idle' },
        },
    ] satisfies PartialDeep<Query>[];

    hoisted.setCachedQueries(cachedQueries);

    const { result } = renderHook(() => useRetryQuery());
    hoisted.triggerStoreChange();
    expect(result.current.isRetrying).toBe(false);

    result.current.retry([]);
    hoisted.triggerStoreChange();
    expect(result.current.isRetrying).toBe(false);
});
