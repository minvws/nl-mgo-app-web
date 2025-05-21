import { type Page } from '@playwright/test';

export abstract class AbstractPage {
    protected readonly page: Page;
    readonly pathname: string;

    constructor(page: Page, pathname: string) {
        this.page = page;
        this.pathname = pathname;
    }

    async goto() {
        await this.page.goto(this.pathname);
    }
}
