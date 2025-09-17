import {
    HealthCategoryWithSlug,
    useHealthCategoriesWithSlug,
} from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';

export function useHealthCategoryBySlug(
    slug: string | undefined
): HealthCategoryWithSlug | undefined {
    const healthCategories = useHealthCategoriesWithSlug();
    if (!slug) return undefined;
    return healthCategories.find((category) => category.slug === slug);
}
