import { store } from '$/store';
import { type HealthCategory } from '../HealthCategory';
import { healthCategoryData } from './categories';

export type HealthCategoryData<T extends HealthCategory = HealthCategory> = ReturnType<
    (typeof healthCategoryData)[T]
>;

export function useHealthCategoryData<T extends HealthCategory>(
    category: T | undefined,
    organizationIdFilter?: (string | undefined)[]
) {
    const getResourcesByProfile = store.use.getResourcesByProfile();

    if (!category) {
        return;
    }

    const getHealthCategoryData = healthCategoryData[category];
    return getHealthCategoryData(
        getResourcesByProfile,
        organizationIdFilter
    ) as HealthCategoryData<T>;
}
