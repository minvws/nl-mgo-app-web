import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { expect } from '../setup';
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/inloggen');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('login.heading'),
    });
    readonly buttonDigid = this.page.getByRole('button', {
        name: appMessage('login.digid'),
    });

    async loginDigid() {
        await expect(this.page).toHavePathname(this.pathname!);
        const currentUrl = this.page.url();
        const { origin } = new URL(currentUrl);
        await this.buttonDigid.click();
        await expect(this.page).toHaveURL(/irealisatie\.nl\/digid-mock/, { timeout: 15000 });
        await this.page.getByRole('link', { name: 'Login' }).click();
        // Check if we're back on the original origin (after the oidc redirect).
        // AND that there is no `userinfo` in the url params anymore, this should indicate that
        // the URL params have been processed and that we're logged in.
        await this.page.waitForURL(new RegExp(`^${origin}[^?]*((?![?&]userinfo=).)*$`, 'i'));
    }
}
