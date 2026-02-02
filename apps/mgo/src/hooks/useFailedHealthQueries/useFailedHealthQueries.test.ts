import { beforeEach, expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { renderHook } from '@testing-library/react';
import { useSyncExternalStore } from 'react';
import { getFailedHealthQueryHashes } from './getFailedHealthQueryHashes';
import { useFailedHealthQueries } from './useFailedHealthQueries';

const hoisted = vi.hoisted(() => {
    return {
        getFailedHealthQueryHashes: vi.fn<typeof getFailedHealthQueryHashes>(() => []),
        useRetryQuery: vi.fn(() => ({
            retry: vi.fn(),
            isRetrying: false,
        })),
    };
});

vi.mock('./getFailedHealthQueryHashes', () => {
    return {
        getFailedHealthQueryHashes: hoisted.getFailedHealthQueryHashes,
    };
});

vi.mock('@tanstack/react-query', async () => {
    const actual =
        await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
        ...actual,
        useQueryClient: () => ({
            getQueryCache: () => ({
                subscribe: vi.fn(),
            }),
        }),
    };
});

vi.mock('../useRetryQuery/useRetryQuery', () => ({
    useRetryQuery: hoisted.useRetryQuery,
}));

vi.mock('react', async (importActual) => {
    const actual = await importActual<typeof import('react')>();
    return {
        ...actual,
        useSyncExternalStore: vi.fn((_sub, snapshot) => snapshot()),
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

test('retrieves failed queries by status and partial query key, defaults to all categories', async () => {
    const failedQueryHashes: string[] = [];
    hoisted.getFailedHealthQueryHashes.mockReturnValueOnce(failedQueryHashes);

    const { result } = renderHook(() => useFailedHealthQueries());

    expect(result.current.failedQueryHashes).toEqual(failedQueryHashes);
    expect(result.current.hasFailedQueries).toEqual(false);
    expect(result.current.isRetrying).toEqual(false);
});

test('retrieves failed queries by status and partial query key', async () => {
    const failedQueryHashes = mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 10,
    });
    hoisted.getFailedHealthQueryHashes.mockReturnValueOnce(failedQueryHashes);

    const { result } = renderHook(() => useFailedHealthQueries());

    expect(result.current.failedQueryHashes).toEqual(failedQueryHashes);
    expect(result.current.hasFailedQueries).toEqual(true);
    expect(result.current.isRetrying).toEqual(false);
});

test('retry with failed query hases', async () => {
    const failedQueryHashes = mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 10,
    });

    const mockRetry = vi.fn();
    hoisted.getFailedHealthQueryHashes.mockReturnValueOnce(failedQueryHashes);
    hoisted.useRetryQuery.mockImplementationOnce(() => ({
        retry: mockRetry,
        isRetrying: true,
    }));

    const { result } = renderHook(() => useFailedHealthQueries());

    result.current.retry();

    expect(result.current.failedQueryHashes).toEqual(failedQueryHashes);
    expect(result.current.hasFailedQueries).toEqual(true);
    expect(result.current.isRetrying).toEqual(true);
    expect(mockRetry).toHaveBeenCalledWith(failedQueryHashes);
});

test('updates snapshot when hashes change but length stays the same', async () => {
    vi.mocked(useSyncExternalStore).mockImplementationOnce((_sub, snapshot) => {
        snapshot();
        return snapshot();
    });

    hoisted.getFailedHealthQueryHashes
        .mockReturnValueOnce(['a', 'b'])
        .mockReturnValueOnce(['a', 'c']);

    const { result } = renderHook(() => useFailedHealthQueries());

    expect(result.current.failedQueryHashes).toEqual(['a', 'c']);
});
