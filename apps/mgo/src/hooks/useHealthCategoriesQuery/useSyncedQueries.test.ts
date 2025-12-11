import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { useSyncedQueries } from './useSyncedQueries';

const hoisted = vi.hoisted(() => {
    return {
        results: [] as Array<{
            data: unknown;
            dataUpdatedAt: number | undefined;
            isError: boolean;
            isFetching: boolean;
            isLoading: boolean;
        }>,
        setResults: (
            next: Array<{
                data: unknown;
                dataUpdatedAt: number | undefined;
                isError: boolean;
                isFetching: boolean;
                isLoading: boolean;
            }>
        ) => {
            hoisted.results = next;
        },
        useQueries: vi.fn(() => hoisted.results),
    };
});

vi.mock('@tanstack/react-query', async () => {
    const actual =
        await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
        ...actual,
        useQueries: () => hoisted.useQueries(),
    };
});

beforeEach(() => {
    vi.restoreAllMocks();
    hoisted.setResults([]);
});

test('returns one result per config and syncs when data updates', async () => {
    const onSyncA = vi.fn();
    const onSyncB = vi.fn();

    const queryConfigs = [
        { queryKey: ['a'], queryFn: () => 1, onSync: onSyncA },
        { queryKey: ['b'], queryFn: () => 2, onSync: onSyncB },
    ];

    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: false, isLoading: false },
        { data: 2, dataUpdatedAt: 2000, isError: false, isFetching: false, isLoading: false },
    ]);

    const { result, rerender } = renderHook(() => useSyncedQueries(queryConfigs));

    expect(result.current).toHaveLength(2);

    await waitFor(() => {
        expect(onSyncA).toHaveBeenCalledWith(1);
        expect(onSyncB).toHaveBeenCalledWith(2);
    });

    await waitFor(() => {
        expect(result.current[0].isSynced).toBe(true);
        expect(result.current[1].isSynced).toBe(true);
    });

    // Update with newer dataUpdatedAt values -> should sync again
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1500, isError: false, isFetching: false, isLoading: false },
        { data: 2, dataUpdatedAt: 2500, isError: false, isFetching: false, isLoading: false },
    ]);
    rerender();

    await waitFor(() => {
        expect(onSyncA).toHaveBeenCalledTimes(2);
        expect(onSyncB).toHaveBeenCalledTimes(2);
        expect(result.current[0].isSynced).toBe(true);
        expect(result.current[1].isSynced).toBe(true);
    });
});

test('does not sync when a query errors and isSynced becomes false', async () => {
    const onSync = vi.fn();
    const queryConfigs = [{ queryKey: ['a'], queryFn: () => 1, onSync }];

    // Initial successful fetch -> will sync
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: false, isLoading: false },
    ]);
    const { result, rerender } = renderHook(() => useSyncedQueries(queryConfigs));

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current[0].isSynced).toBe(true));

    // Now the query errors -> should not call onSync again and not be synced
    hoisted.setResults([
        {
            data: undefined,
            dataUpdatedAt: 2000,
            isError: true,
            isFetching: false,
            isLoading: false,
        },
    ]);
    rerender();

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    expect(result.current[0].isSynced).toBe(false);
});

test('isSynced is false during fetching/loading even if timestamps match', async () => {
    const onSync = vi.fn();
    const queryConfigs = [{ queryKey: ['a'], queryFn: () => 1, onSync }];

    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: false, isLoading: false },
    ]);
    const { result, rerender } = renderHook(() => useSyncedQueries(queryConfigs));

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current[0].isSynced).toBe(true));

    // Fetching -> becomes unsynced
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: true, isLoading: false },
    ]);
    rerender();
    expect(result.current[0].isSynced).toBe(false);

    // Loading -> remains unsynced
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: false, isLoading: true },
    ]);
    rerender();
    expect(result.current[0].isSynced).toBe(false);
});

test('syncs after retry when a query transitions from error to success', async () => {
    const onSync = vi.fn();
    const queryConfigs = [{ queryKey: ['a'], queryFn: () => 1, onSync }];

    // Initial error result -> should not sync
    hoisted.setResults([
        {
            data: undefined,
            dataUpdatedAt: 1000,
            isError: true,
            isFetching: false,
            isLoading: false,
        },
    ]);
    const { result, rerender } = renderHook(() => useSyncedQueries(queryConfigs));

    expect(onSync).not.toHaveBeenCalled();
    expect(result.current[0].isSynced).toBe(false);

    // Transient error updates (e.g., retry attempts) with newer timestamps -> still no sync
    hoisted.setResults([
        {
            data: undefined,
            dataUpdatedAt: 1100,
            isError: true,
            isFetching: false,
            isLoading: false,
        },
    ]);
    rerender();
    expect(onSync).not.toHaveBeenCalled();
    expect(result.current[0].isSynced).toBe(false);

    hoisted.setResults([
        {
            data: undefined,
            dataUpdatedAt: 1200,
            isError: true,
            isFetching: false,
            isLoading: false,
        },
    ]);
    rerender();
    expect(onSync).not.toHaveBeenCalled();
    expect(result.current[0].isSynced).toBe(false);

    // Success after retry -> should sync once and become synced
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 2000, isError: false, isFetching: false, isLoading: false },
    ]);
    rerender();

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current[0].isSynced).toBe(true));
});

test('preserves previous syncedAt when next result has no newer timestamp', async () => {
    const onSync = vi.fn();
    const queryConfigs = [{ queryKey: ['a'], queryFn: () => 1, onSync }];

    // Initial successful fetch -> will sync and set lastSyncedAt to 1000
    hoisted.setResults([
        { data: 1, dataUpdatedAt: 1000, isError: false, isFetching: false, isLoading: false },
    ]);
    const { result, rerender } = renderHook(() => useSyncedQueries(queryConfigs));

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current[0].isSynced).toBe(true));

    // Next result has no dataUpdatedAt -> should keep previous syncedAt and not call onSync
    hoisted.setResults([
        { data: 1, dataUpdatedAt: undefined, isError: false, isFetching: false, isLoading: false },
    ]);
    rerender();

    await waitFor(() => expect(onSync).toHaveBeenCalledTimes(1));
    // With undefined dataUpdatedAt, isSynced becomes false (timestamps cannot match)
    expect(result.current[0].isSynced).toBe(false);
});
