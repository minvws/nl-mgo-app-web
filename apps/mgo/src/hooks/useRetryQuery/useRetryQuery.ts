import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState, useSyncExternalStore } from 'react';

export function useRetryQuery() {
    const [retryQueryHashes, setRetryQueryHashes] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();

    const retry = useCallback(
        async (queryHashes: string[]) => {
            if (queryHashes.length === 0) return;
            setRetryQueryHashes(queryHashes);
            queryClient.refetchQueries({
                predicate: (query) => queryHashes.includes(query.queryHash),
            });
        },
        [queryClient]
    );

    const getQueryIsFetching = () =>
        retryQueryHashes.some((hash) => {
            const query = queryCache.get(hash);
            return query?.state.fetchStatus === 'fetching';
        });

    const isRetrying = useSyncExternalStore(
        (onStoreChange) => queryCache.subscribe(onStoreChange),
        getQueryIsFetching
    );

    return {
        retry,
        isRetrying,
    };
}
