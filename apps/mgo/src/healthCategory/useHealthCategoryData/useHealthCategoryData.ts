import { useResourcesStore } from '$/store';
import { type HealthCategory } from '../HealthCategory';
import { healthCategoryData } from './categories';

export type HealthCategoryData<T extends HealthCategory = HealthCategory> = ReturnType<
    (typeof healthCategoryData)[T]
>;

export function useHealthCategoryData<T extends HealthCategory>(
    category: T | undefined,
    organizationIdFilter?: (string | undefined)[]
) {
    const resources = useResourcesStore();

    if (!category) {
        return;
    }

    const getHealthCategoryData = healthCategoryData[category];
    return getHealthCategoryData(resources, organizationIdFilter) as HealthCategoryData<T>;
}
