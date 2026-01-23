import { getHealthCategoryConfigs, getRelevantEndpoints } from '$/config';
import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { includesAll } from '@minvws/mgo-utils';
import { QueryCache } from '@tanstack/react-query';
import { HEALTH_QUERY_KEY } from '../useHealthCategoriesQuery/createHealthQuery';

export interface FailedHealthQueryOptions {
    organizationsFilter?: HealthcareOrganization[];
    categoriesFilter?: HealthCategoryConfig[];
}

const allCategories = getHealthCategoryConfigs();

export function getFailedHealthQueryHashes(
    queryCache: QueryCache,
    { organizationsFilter, categoriesFilter }: FailedHealthQueryOptions
) {
    const relevantEndpoints = getRelevantEndpoints(
        categoriesFilter && categoriesFilter.length > 0 ? categoriesFilter : allCategories
    );
    const queryKeySets: string[][] = [];

    if (organizationsFilter?.length) {
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
