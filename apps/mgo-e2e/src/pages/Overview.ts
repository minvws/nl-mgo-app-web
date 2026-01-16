import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { HealthCategoryType } from '../constants';
import { AbstractPage } from './AbstractPage';

export class OverviewPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/overzicht');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('overview.heading'),
    });
    readonly headingNoOrganizations = this.page.getByRole('heading', {
        level: 2,
        name: appMessage('common.no_organizations_heading'),
    });
    readonly buttonAddOrganization = this.page.getByRole('link', {
        name: appMessage('common.add_organizations'),
    });
    readonly failedRequestHeading = this.page.getByText(
        appMessage('common.data_not_retrieved_heading')
    );

    readonly buttonRetryFailedRequests = this.page.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    buttonHealthCategory(category: HealthCategoryType) {
        return this.page.getByRole('link').filter({
            has: this.page.getByRole('heading', { name: appMessage(`hc_${category}.heading`) }),
        });
    }
}
