import { appMessage } from '@minvws/mgo-intl/test';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class PrivacyStatementPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/privacy');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        /**
         * Note:
         * There is no translation key for this content as it comes from markdown content inside another translation.
         * This means it is sensitive to copy changes and therefor we use a basic regexp to match the content.
         */
        name: /Privacyverklaring/i,
    });

    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });
}
