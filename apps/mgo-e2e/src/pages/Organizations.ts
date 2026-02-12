import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class OrganizationsPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/zorgaanbieders');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('organizations.heading'),
    });
    readonly headingNoOrganizations = this.page.getByRole('heading', {
        level: 2,
        name: appMessage('common.no_organizations_heading'),
    });
    readonly buttonAddOrganization = this.page.getByRole('link', {
        name: appMessage('common.add_organizations'),
    });

    buttonOrganization(name: string) {
        return this.page.getByRole('link', { name });
    }
}
