import { getMainHealthCategoryConfigs } from '$/config/healthCategories/healthCategories';
import { MainHealthCategoryConfig } from '@minvws/mgo-config';
import { OverrideProperties } from 'type-fest';
import {
    HealthCategoryWithSlug,
    useHealthCategoriesWithSlug,
} from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';

export type MainHealthCategoryWithSlugs = OverrideProperties<
    MainHealthCategoryConfig,
    { categories: HealthCategoryWithSlug[] }
>;

export function useMainHealthCategoriesWithSlugs(): MainHealthCategoryWithSlugs[] {
    const healthCategoriesWithSlugs = useHealthCategoriesWithSlug();
    const mainHealthCategories = getMainHealthCategoryConfigs();
    return mainHealthCategories.map(({ categories, ...rest }) => ({
        categories: categories.map((category) => {
            const healthCategoryWithSlug = healthCategoriesWithSlugs.find(
                ({ id }) => id === category.id
            );
            if (!healthCategoryWithSlug) {
                throw new Error(`Health category with slug not found for category ${category.id}`);
            }
            return healthCategoryWithSlug;
        }),
        ...rest,
    }));
}
