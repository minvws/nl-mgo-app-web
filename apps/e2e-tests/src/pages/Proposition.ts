import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class PropositionPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/hoe-werkt-het');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('proposition.heading'),
    });
    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });
    readonly buttonContinue = this.page.getByRole('link', {
        name: appMessage('common.next'),
    });
    readonly linkPrivacyPage = this.page.getByRole('link', {
        /**
         * Note:
         * There is no translation key for this content as it comes from markdown content inside another translation.
         * This means it is sensitive to copy changes and therefor we use a basic regexp to match the content.
         */
        name: /privacyverklaring/i,
    });
}
