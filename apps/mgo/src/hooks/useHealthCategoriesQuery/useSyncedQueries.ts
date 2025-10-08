import { hashKey, QueryObserverResult, QueryOptions, useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type SyncedQueryConfigFromConfig<
    T extends QueryOptions & { queryFn: () => Promise<unknown> },
> = T & SyncedQueryConfig<Awaited<ReturnType<T['queryFn']>>>;

export type SyncedQueryConfig<TData = unknown> = QueryOptions & {
    queryKey: unknown[];
    queryFn: () => Promise<TData> | TData;
    onSync?: (data: TData) => void;
};

type SyncedQueryResult<T> = QueryObserverResult<T> & {
    isSynced: boolean;
};

export function useSyncedQueries<TData = unknown>(
    queryConfigs: SyncedQueryConfig<TData>[]
): SyncedQueryResult<TData>[] {
    const results = useQueries({ queries: queryConfigs });
    const dataUpdatedAtKey = results.map((q) => q.dataUpdatedAt).join('|');
    const [lastSyncedAtMap, setLastSyncedAtMap] = useState<Partial<Record<string, number>>>({});

    useEffect(() => {
        const resultMap: Record<string, QueryObserverResult<TData>> = {};
        results.forEach((res, i) => {
            const key = hashKey(queryConfigs[i].queryKey);
            resultMap[key] = res;
        });

        setLastSyncedAtMap((prev) => {
            const next: Partial<Record<string, number>> = {};

            queryConfigs.forEach((q) => {
                const key = hashKey(q.queryKey);
                const res = resultMap[key];

                if (!res || res.isError) {
                    if (key in prev) next[key] = prev[key];
                    return;
                }

                const prevSyncedAt = prev[key] ?? 0;
                const dataUpdatedAt = res.dataUpdatedAt;

                if (res.data && dataUpdatedAt > prevSyncedAt) {
                    q.onSync?.(res.data as TData);
                    next[key] = dataUpdatedAt;
                } else if (key in prev) {
                    next[key] = prevSyncedAt;
                }
            });

            const prevKeys = Object.keys(prev);
            const nextKeys = Object.keys(next);
            const same =
                prevKeys.length === nextKeys.length && nextKeys.every((k) => prev[k] === next[k]);

            return same ? prev : next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdatedAtKey, queryConfigs]);

    return results.map((res, i) => {
        const key = hashKey(queryConfigs[i].queryKey);
        const lastSyncedAt = lastSyncedAtMap[key];
        const isSynced =
            !res.isFetching &&
            !res.isLoading &&
            !!res.dataUpdatedAt &&
            lastSyncedAt === res.dataUpdatedAt;

        return {
            ...res,
            isSynced,
        } as SyncedQueryResult<TData>;
    });
}
