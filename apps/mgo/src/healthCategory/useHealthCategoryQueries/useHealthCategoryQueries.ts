import { useOrganizationsStore } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { type HealthCategory } from '../HealthCategory';
import { healthCategoryQueries } from './categories';

export function useHealthCategoryQueries<T extends HealthCategory>(
    category: T,
    organizationIdFilter?: (string | undefined)[]
): UseQueryOptions[] {
    const organizationsStore = useOrganizationsStore();
    const organizations = organizationIdFilter
        ? organizationsStore.getOrganizationsById(organizationIdFilter)
        : organizationsStore.getAllOrganizations();

    const getOrganizationQueries = healthCategoryQueries[category];

    const categoryQueries: UseQueryOptions[] = [];
    for (const organization of organizations) {
        categoryQueries.push(...getOrganizationQueries(organization));
    }

    return categoryQueries;
}
