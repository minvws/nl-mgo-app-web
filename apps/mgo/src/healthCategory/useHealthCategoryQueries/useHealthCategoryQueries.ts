import { useOrganizationsStore, type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { HealthCategory } from '../HealthCategory';
import { getMedicationQueries } from './medication';

const healthCategoryQueries = {
    [HealthCategory.Medication]: getMedicationQueries,
    [HealthCategory.Allergies]: () => [],
    [HealthCategory.Complaints]: () => [],
    [HealthCategory.Documents]: () => [],
    [HealthCategory.LabResults]: () => [],
    [HealthCategory.Measurements]: () => [],
    [HealthCategory.Reports]: () => [],
    [HealthCategory.Treatments]: () => [],
    [HealthCategory.Vaccinations]: () => [],
} satisfies Record<HealthCategory, (organization: HealthcareOrganization) => UseQueryOptions[]>;

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
