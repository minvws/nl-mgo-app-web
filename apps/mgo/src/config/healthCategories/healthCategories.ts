import {
    healthCategoriesConfig,
    type HealthCategoryConfig,
    type MainHealthCategoryConfig,
    type SubHealthCategoryConfig,
} from '@minvws/mgo-config';

export type { HealthCategoryConfig, MainHealthCategoryConfig, SubHealthCategoryConfig };

export function getHealthCategoryConfigs(): HealthCategoryConfig[] {
    return healthCategoriesConfig.flatMap((mainCategory) => mainCategory.categories);
}

export function getMainHealthCategoryConfigs(): MainHealthCategoryConfig[] {
    return healthCategoriesConfig;
}
