import { type HealthCategoryData } from '../useHealthCategoryData/useHealthCategoryData';

export function isEmpty(data: HealthCategoryData) {
    return !Object.values(data).some((x) => x?.length > 0);
}
