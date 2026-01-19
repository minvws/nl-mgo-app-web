import { getHealthCategoryConfigs, getRelevantEndpoints } from '$/config';
import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { includesAll } from '@minvws/mgo-utils';
import { QueryCache, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useSyncExternalStore } from 'react';
import { HEALTH_QUERY_KEY } from '../useHealthCategoriesQuery/createHealthQuery';
import { useRetryQuery } from '../useRetryQuery/useRetryQuery';

export interface FailedHealthQueryOptions {
    organizationsFilter?: HealthcareOrganization[];
    categoriesFilter?: HealthCategoryConfig[];
}

const allCategories = getHealthCategoryConfigs();

function getFailedHealthQueryHashes(
    queryCache: QueryCache,
    { organizationsFilter, categoriesFilter }: FailedHealthQueryOptions
) {
    const relevantEndpoints = getRelevantEndpoints(
        categoriesFilter && categoriesFilter.length > 0 ? categoriesFilter : allCategories
    );
    const queryKeySets: string[][] = [];

    if (organizationsFilter && organizationsFilter.length > 0) {
        for (const organization of organizationsFilter) {
            for (const dataService of organization.dataServices) {
                queryKeySets.push(
                    ...relevantEndpoints
                        .filter((x) => x.dataServiceId === dataService.id)
                        .map((x) => [organization.id, dataService.id, x.endpointId])
                );
            }
        }
    } else {
        queryKeySets.push(...relevantEndpoints.map((x) => [x.dataServiceId, x.endpointId]));
    }

    return queryCache
        .findAll({
            predicate: (query) =>
                (query.state.status === 'error' ||
                    /* a paused query means it could not be fetched due to being offline */
                    query.state.fetchStatus === 'paused') &&
                query.queryKey[0] === HEALTH_QUERY_KEY &&
                queryKeySets.some((querySet) => includesAll(query.queryKey, querySet)),
        })
        .map((query) => query.queryHash);
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
