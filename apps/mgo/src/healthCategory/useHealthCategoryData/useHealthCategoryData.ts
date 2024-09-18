import { useResourcesStore, type ResourcesState } from '$/store';
import { HealthCategory } from '../HealthCategory';
import { getMedicationData } from './medication';
import { getPayerData } from './payer';
import { getPersonalInformationData } from './personalInformation';

type HealthCategoryResources = (
    resources: ResourcesState,
    organizationIds?: (string | undefined)[]
) => Record<string, unknown>;

export const healthCategoryData = {
    [HealthCategory.PersonalInformation]: getPersonalInformationData,
    [HealthCategory.Payer]: getPayerData,
    // [HealthCategory.Medication]: getMedicationData,
    // [HealthCategory.Allergies]: () => ({}),
    // [HealthCategory.Complaints]: () => ({}),
    // [HealthCategory.Documents]: () => ({}),
    // [HealthCategory.LabResults]: () => ({}),
    // [HealthCategory.Measurements]: () => ({}),
    // [HealthCategory.Reports]: () => ({}),
    // [HealthCategory.Treatments]: () => ({}),
    // [HealthCategory.Vaccinations]: () => ({}),
} satisfies Record<HealthCategory, HealthCategoryResources>;

export type HealthCategoryData<T extends HealthCategory> = ReturnType<
    (typeof healthCategoryData)[T]
>;

export function useHealthCategoryData<T extends HealthCategory>(
    category: T,
    organizationIdFilter?: (string | undefined)[]
) {
    const resources = useResourcesStore();
    const getHealthCategoryData = healthCategoryData[category];
    return getHealthCategoryData(resources, organizationIdFilter) as HealthCategoryData<T>;
}
