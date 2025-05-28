import { type HealthCategory } from '@minvws/mgo-apps-mgo';
import { appMessage, type AppMessagesIds } from '@minvws/mgo-mgo-intl/test';
import { type Page } from '@playwright/test';

type HealthCategoryList<T extends HealthCategory> =
    Extract<
        AppMessagesIds,
        `health_category.${T}.${string}`
    > extends `health_category.${T}.${infer R}`
        ? R
        : never;

export class HealthCategoryPage {
    constructor(private readonly page: Page) {}

    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });

    heading(category: HealthCategory) {
        return this.page.getByRole('heading', {
            level: 1,
            name: appMessage(`hc_${category}.heading`),
        });
    }

    readonly headingNoData = this.page.getByRole('heading', {
        level: 1,
        name: appMessage(`health_category.empty.heading`),
    });

    readonly loadingProgressbar = this.page.getByRole('progressbar');

    categoryList<T extends HealthCategory>(category: T, subCategory: HealthCategoryList<T>) {
        return this.page.getByRole('list', {
            name: appMessage(`health_category.${category}.${subCategory}` as AppMessagesIds),
        });
    }
}
