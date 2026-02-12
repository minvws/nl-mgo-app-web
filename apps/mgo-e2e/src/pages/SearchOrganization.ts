import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { expect } from '../setup';
import { AbstractPage } from './AbstractPage';
import { OrganizationsPage } from './Organizations';

export class SearchOrganizationPage extends AbstractPage {
    readonly organizationsPage: OrganizationsPage;

    constructor(page: Page) {
        super(page, '/zorgaanbieders/toevoegen');
        this.organizationsPage = new OrganizationsPage(page);
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('add_organization.heading'),
    });
    readonly inputSearch = this.page.getByLabel(appMessage('add_organization.search_aria_label'));
    readonly searchProgressbar = this.page.getByRole('progressbar');

    async search(query: string) {
        await this.inputSearch.fill(query);
        await this.searchProgressbar.isVisible();
        await expect(this.searchProgressbar).toBeHidden({ timeout: 10000 });
    }

    organizationButton(name: string) {
        return this.page.getByRole('button', { name });
    }

    async addOrganization(name: string) {
        const button = await this.organizationButton(name);
        await button.click();
        const dialog = this.page.getByRole('alertdialog');
        const confirmButton = dialog.getByRole('button', {
            name: appMessage('dialog.add_organization_yes'),
        });
        await confirmButton.click();
        await expect(this.organizationsPage.heading).toBeVisible();
    }
}
