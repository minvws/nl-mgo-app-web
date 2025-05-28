import { test as base, type PlaywrightTestArgs, type TestFixture } from '@playwright/test';
import type { StringKeyOf } from 'type-fest';

import { pages, type Pages } from '../pages';
import { assertNoConsoleMessages } from './assertNoConsoleMessages';

type PageTestFixtureMap = {
    [K in StringKeyOf<Pages>]: TestFixture<InstanceType<Pages[K]>, PlaywrightTestArgs>;
};

type Fixtures = {
    [K in keyof Pages]: InstanceType<Pages[K]>;
} & {
    checkConsoleMessages: void;
};

const pageFixtures: Partial<PageTestFixtureMap> = {};
for (const pageName of Object.keys(pages) as StringKeyOf<typeof pages>[]) {
    const PageClass = pages[pageName];
    pageFixtures[pageName] = async ({ page }, use) => {
        await use(new PageClass(page) as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    };
}

export const test = base.extend<Fixtures>({
    ...pageFixtures,

    checkConsoleMessages: [assertNoConsoleMessages, { auto: true }],
});
