import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { HealthCategoryType, SubCategoryType } from '../constants';
import { AbstractPage } from './AbstractPage';

export class HealthCategoryPage extends AbstractPage {
    constructor(page: Page) {
        super(page);
    }

    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });

    heading(category: HealthCategoryType) {
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

    subCategoryList(subCategory: SubCategoryType) {
        return this.page.getByRole('list', {
            name: appMessage(`${subCategory}.heading`),
        });
    }
}
