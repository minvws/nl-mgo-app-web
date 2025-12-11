import {
    getDataServiceEndpointConfig,
    type HealthCategoryConfig,
    type SubHealthCategoryConfig,
} from '$/config';
import { HealthcareOrganization, Resource, useStore } from '$/store';
import { hasIntersection, isNonNullish } from '@minvws/mgo-utils';
import { useQueryClient } from '@tanstack/react-query';
import { useHealthCategoriesQueries } from './useHealthCategoriesQueries';
import { useSyncedQueries } from './useSyncedQueries';

export interface HealthCategoryQueryArgs {
    categories: (HealthCategoryConfig | undefined)[];
    organizations: (HealthcareOrganization | undefined)[];
}

export interface HealthCategoryWithResources extends HealthCategoryConfig {
    subcategories: (SubHealthCategoryConfig & { resources: Resource[] })[];
}

export interface HealthCategoryQuery {
    category: HealthCategoryWithResources;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
    retry: () => void;
}

export function useHealthCategoriesQuery({
    categories: nullableCategories,
    organizations: nullableOrganizations,
}: HealthCategoryQueryArgs) {
    const queryClient = useQueryClient();
    const getResourcesByProfiles = useStore.use.getResourcesByProfiles();
    const categories = nullableCategories.filter(isNonNullish);
    const organizations = nullableOrganizations.filter(isNonNullish);

    const queryConfigs = useHealthCategoriesQueries({ categories, organizations });
    const queries = useSyncedQueries(queryConfigs);

    const queriesByCategory: HealthCategoryQuery[] = categories.map((category) => {
        const categoryProfiles = category.subcategories.flatMap(({ profiles }) => profiles);
        const categoryQueries = queries
            .map((query, i) => ({
                query,
                config: queryConfigs[i],
            }))
            .filter(({ config }) => {
                const { dataServiceId, endpointId } = config.meta;
                const endpointProfiles = getDataServiceEndpointConfig(
                    dataServiceId,
                    endpointId
                )?.profiles;

                if (endpointProfiles === undefined) {
                    throw new Error(
                        `Endpoint config not found for data service ${dataServiceId} and endpoint ${endpointId}`
                    );
                }
                return hasIntersection(categoryProfiles, endpointProfiles);
            });

        const subcategories = category?.subcategories.map((subcategory) => ({
            ...subcategory,
            resources: getResourcesByProfiles(subcategory.profiles, organizations),
        }));

        const retry = () => {
            categoryQueries.forEach((q) => {
                queryClient.invalidateQueries({
                    queryKey: q.config.queryKey,
                });
            });
        };

        return {
            category: {
                ...category,
                subcategories,
            },
            isEmpty: subcategories.every((subcategory) => !subcategory.resources.length),
            isLoading: categoryQueries.some((q) => !q.query.isSynced && !q.query.isError),
            isError: categoryQueries.some((q) => q.query.isError),
            retry,
        };
    });

    return queriesByCategory;
}
