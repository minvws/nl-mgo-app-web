import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class AddOrganizationListPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/zorgaanbieder-toevoegen/zorgaanbieders');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('add_organization_list.heading'),
    });
    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });
    readonly buttonToOverview = this.page.getByRole('link', {
        name: appMessage('add_organization_list.to_overview'),
    });
    readonly buttonAddOrganization = this.page.getByRole('link', {
        name: appMessage('add_organization_list.add_organization'),
    });

    organizationListItem(name: string) {
        return this.page.getByRole('listitem').filter({ has: this.page.getByText(name) });
    }

    async RemoveOrganization(name: string) {
        const listItem = await this.organizationListItem(name);
        listItem.getByRole('button', { name: appMessage('common.delete') }).click();
    }
}
