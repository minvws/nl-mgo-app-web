import { store } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { type HealthCategory } from '../HealthCategory';
import { getHealthcareCategoryQuery } from './categories';

export function useHealthCategoryQueries<T extends HealthCategory>(
    category: T | undefined,
    organizationIdFilter?: (string | undefined)[]
): UseQueryOptions[] {
    const getOrganizationsById = store.use.getOrganizationsById();
    const allOrganizations = store.use.organizations();

    return useMemo(() => {
        if (!category) {
            return [];
        }

        const organizations = organizationIdFilter
            ? getOrganizationsById(organizationIdFilter)
            : allOrganizations;

        const getOrganizationQueries = getHealthcareCategoryQuery(category);
        const categoryQueries: UseQueryOptions[] = [];
        for (const organization of organizations) {
            categoryQueries.push(...getOrganizationQueries(organization));
        }

        return categoryQueries;
        // eslint-disable-next-line react-hooks/exhaustive-deps -- organizationIdFilter can change referentially
    }, [category, JSON.stringify(organizationIdFilter), getOrganizationsById, allOrganizations]);
}
