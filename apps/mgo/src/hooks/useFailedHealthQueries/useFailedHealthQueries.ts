import { getHealthCategoryConfigs, getRelevantEndpoints } from '$/config';
import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { includesAll } from '@minvws/mgo-utils';
import { QueryCache, useQueryClient } from '@tanstack/react-query';
import { useRef, useSyncExternalStore } from 'react';
import { HEALTH_QUERY_KEY } from '../useHealthCategoriesQuery/createHealthQuery';

export interface FailedHealthQueryOptions {
    organizations?: HealthcareOrganization[];
    categories?: HealthCategoryConfig[];
}

const allCategories = getHealthCategoryConfigs();

function getFailedHealthQueryHashes(
    queryCache: QueryCache,
    { organizations, categories }: FailedHealthQueryOptions
) {
    const relevantEndpoints = getRelevantEndpoints(categories ?? allCategories);
    const queryKeySets: string[][] = [];

    if (organizations) {
        for (const organization of organizations) {
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
                query.state.status === 'error' &&
                query.queryKey[0] === HEALTH_QUERY_KEY &&
                queryKeySets.some((querySet) => includesAll(query.queryKey, querySet)),
        })
        .map((query) => query.queryHash);
}

export function useFailedHealthQueries({
    organizations,
    categories,
}: FailedHealthQueryOptions = {}) {
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();
    const lastSnapshotRef = useRef<string[]>([]);

    return useSyncExternalStore(queryCache.subscribe, () => {
        const next = getFailedHealthQueryHashes(queryCache, { organizations, categories }).sort();
        if (
            next.length !== lastSnapshotRef.current.length ||
            next.some((hash, i) => hash !== lastSnapshotRef.current[i])
        ) {
            lastSnapshotRef.current = next;
        }
        return lastSnapshotRef.current;
    });
}
