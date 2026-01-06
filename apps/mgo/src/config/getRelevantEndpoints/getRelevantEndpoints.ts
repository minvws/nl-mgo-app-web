import {
    dataServiceConfigs,
    type DataServiceConfig,
    type DataServiceEndpointConfig,
    type HealthCategoryConfig,
} from '$/config';
import { memoize } from 'lodash';

type DataServiceEndpoint = {
    dataServiceId: DataServiceConfig['id'];
    endpointId: DataServiceEndpointConfig['id'];
};

function getRelevantEndpointsForCategory(category: HealthCategoryConfig) {
    const categoryProfiles = category.subcategories.flatMap(({ profiles }) => profiles);
    const categoryProfilesSet = new Set(categoryProfiles);
    const categoryEndpoints: DataServiceEndpoint[] = [];

    for (const { id: dataServiceId, endpoints } of dataServiceConfigs) {
        const relevantEndpoints = endpoints.filter(({ profiles }) =>
            profiles.some((profile) => categoryProfilesSet.has(profile))
        );

        if (!relevantEndpoints?.length) {
            continue;
        }

        categoryEndpoints.push(
            ...relevantEndpoints.map((endpoint) => ({
                dataServiceId,
                endpointId: endpoint.id,
            }))
        );
    }

    return categoryEndpoints;
}

/**
 * Data service configs as well as the health category configs are completely static.
 * Therefore, we can safely memoize the relevant endpoints for a category.
 */
const memoizedGetRelevantEndpointsForCategory = memoize(
    getRelevantEndpointsForCategory,
    (category) => category.id
);

export function getRelevantEndpoints(categories: HealthCategoryConfig[]) {
    const dataServiceEndpoints: DataServiceEndpoint[] = [];
    const seen = new Set<string>();

    for (const category of categories) {
        const relevantEndpoints = memoizedGetRelevantEndpointsForCategory(category);
        for (const endpoint of relevantEndpoints) {
            const key = `${endpoint.dataServiceId}-${endpoint.endpointId}`;
            if (seen.has(key)) continue;
            seen.add(key);
            dataServiceEndpoints.push(endpoint);
        }
    }
    return dataServiceEndpoints;
}
