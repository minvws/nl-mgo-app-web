import { type HealthCategoryConfig } from '@minvws/mgo-config';
import { useHealthCategoriesWithSlug } from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';

export function useHealthCategorySlug(category: HealthCategoryConfig) {
    const healthCategories = useHealthCategoriesWithSlug();
    const healthCategory = healthCategories.find(({ id }) => id === category.id);
    return healthCategory?.slug;
}
