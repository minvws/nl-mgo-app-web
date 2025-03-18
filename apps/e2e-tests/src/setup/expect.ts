import {
    expect as baseExpect,
    type ExpectMatcherState,
    type MatcherReturnType,
    type Page,
} from '@playwright/test';

export { test } from '@playwright/test';

async function toHavePathname(
    this: ExpectMatcherState,
    page: Page,
    expected: string
): Promise<MatcherReturnType> {
    const assertionName = 'toHavePathname';
    const currentUrl = await page.url();
    const pathname = new URL(currentUrl).pathname;
    const pass = pathname === expected;

    const message = () =>
        this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
        }) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(pathname)}`;

    return {
        message,
        pass,
        name: assertionName,
        expected,
        actual: pathname,
    };
}

export const expect = baseExpect.extend({
    toHavePathname,
});
