import { type HealthCategoryData } from '../useHealthCategoryData/useHealthCategoryData';

export function isEmpty(data: HealthCategoryData) {
    if (!data) return true;
    return !Object.values(data).some((x) => Array.isArray(x) && x.length > 0);
}
