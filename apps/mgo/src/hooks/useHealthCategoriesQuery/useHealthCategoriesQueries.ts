import { HealthCategoryConfig } from '$/config';
import { HealthcareOrganization, useStore } from '$/store';
import { useMemo } from 'react';
import { createHealthQueries } from './createHealthQueries';
import { SyncedQueryConfigFromConfig } from './useSyncedQueries';

export interface HealthCategoryQueryArgs {
    categories: HealthCategoryConfig[];
    organizations: HealthcareOrganization[];
}

export function useHealthCategoriesQueries({ categories, organizations }: HealthCategoryQueryArgs) {
    const syncResources = useStore.use.syncResources();

    const categoriesKey = categories.map((category) => category.id).join('|');
    const organisationsKey = organizations.map((organization) => organization.id).join('|');

    return useMemo(() => {
        const configs = createHealthQueries({ categories, organizations });
        return configs.map((config) => {
            return {
                ...config,
                onSync: (mgoResources) => {
                    const { dataServiceId, organizationId, endpointId } = config.meta;
                    const source = { organizationId, dataServiceId, endpointId };
                    syncResources(source, mgoResources);
                },
            } as SyncedQueryConfigFromConfig<typeof config>;
        });
        // We're using stable keys instead of the full categories/organizations arrays to avoid unnecessary re-renders
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesKey, organisationsKey, syncResources]);
}
