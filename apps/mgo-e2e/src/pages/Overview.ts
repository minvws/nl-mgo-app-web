import { type HealthCategory } from '@minvws/mgo';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
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

    buttonHealthCategory(category: HealthCategory) {
        return this.page.getByRole('link', { name: appMessage(`hc_${category}.heading`) });
    }
}
