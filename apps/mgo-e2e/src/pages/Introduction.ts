import { appMessage } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class IntroductionPage extends AbstractPage {
    constructor(page: Page) {
        super(page, '/welkom');
    }

    readonly heading = this.page.getByRole('heading', {
        level: 1,
        name: appMessage('introduction.heading'),
    });
    readonly buttonContinue = this.page.getByRole('link', {
        name: appMessage('common.next'),
    });
}
