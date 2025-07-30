import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { expect } from '../setup';
import { AbstractPage } from './AbstractPage';

export class AddOrganizationPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/zorgaanbieder-toevoegen');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('add_organization.heading'),
    });
    readonly inputName = this.page.getByLabel(appMessage('add_organization.name'));
    readonly inputCity = this.page.getByLabel(appMessage('add_organization.city'));
    readonly buttonSubmit = this.page.getByRole('button', {
        name: appMessage('common.search'),
    });
    readonly searchProgressbar = this.page.getByRole('progressbar');

    async search(name: string, city: string) {
        await this.inputName.fill(name);
        await this.inputCity.fill(city);
        await this.buttonSubmit.click();
        await this.searchProgressbar.isVisible();
        await expect(this.searchProgressbar).toBeHidden();
    }

    organizationListItem(name: string) {
        return this.page
            .getByRole('listitem')
            .filter({ has: this.page.getByRole('heading', { name, level: 2 }) });
    }

    async addOrganization(name: string) {
        const listItem = await this.organizationListItem(name);
        listItem.getByRole('button', { name }).click();
    }
}
