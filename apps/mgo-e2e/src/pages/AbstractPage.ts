import { type Page } from '@playwright/test';

export abstract class AbstractPage {
    protected readonly page: Page;
    readonly pathname: string | undefined;

    constructor(page: Page, pathname?: string) {
        this.page = page;
        this.pathname = pathname;
    }

    async goto() {
        if (!this.pathname) {
            throw new Error('Pathname is not set!');
        }
        await this.page.goto(this.pathname);
    }
}
