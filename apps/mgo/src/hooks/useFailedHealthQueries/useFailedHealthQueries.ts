import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useSyncExternalStore } from 'react';
import { useRetryQuery } from '../useRetryQuery/useRetryQuery';
import { getFailedHealthQueryHashes } from './getFailedHealthQueryHashes';

export interface FailedHealthQueryOptions {
    organizationsFilter?: HealthcareOrganization[];
    categoriesFilter?: HealthCategoryConfig[];
}

export function useFailedHealthQueries({
    organizationsFilter,
    categoriesFilter,
}: FailedHealthQueryOptions = {}) {
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();
    const { retry: retryQueries, isRetrying } = useRetryQuery();

    const lastSnapshotRef = useRef<string[]>([]);

    const getSnapshot = () => {
        const next = getFailedHealthQueryHashes(queryCache, {
            organizationsFilter,
            categoriesFilter,
        }).sort();

        if (
            next.length !== lastSnapshotRef.current.length ||
            next.some((hash, i) => hash !== lastSnapshotRef.current[i])
        ) {
            lastSnapshotRef.current = next;
        }

        return lastSnapshotRef.current;
    };

    const failedQueryHashes = useSyncExternalStore(queryCache.subscribe, getSnapshot, getSnapshot);

    const retry = useCallback(() => {
        retryQueries(failedQueryHashes);
    }, [retryQueries, failedQueryHashes]);

    return {
        failedQueryHashes,
        hasFailedQueries: failedQueryHashes.length > 0,
        retry,
        isRetrying,
    };
}
