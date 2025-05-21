import {
    type ConsoleMessage,
    type PlaywrightTestArgs,
    type PlaywrightTestOptions,
    type TestFixture,
} from '@playwright/test';

import { expect } from '.';

interface LoggedConsoleMessage {
    type: ReturnType<ConsoleMessage['type']>;
    message: ReturnType<ConsoleMessage['text']>;
    toString: () => string;
}

const ignoredMessages = [
    'Failed to load resource: net::ERR_CONNECTION_RESET', // Ignore connection reset error, which can be triggered when a test is retried.
];

/**
 * Asserts that no console messages are logged during the test.
 * NOTE: For development mode, only errors are checked.
 */
export const assertNoConsoleMessages: TestFixture<
    void,
    PlaywrightTestArgs & PlaywrightTestOptions
> = async ({ page, baseURL }, use) => {
    if (!baseURL) {
        throw new Error('baseURL is not defined');
    }
    const consoleMessages: LoggedConsoleMessage[] = [];

    page.on('console', async (message) => {
        const url = await page.url();
        const { origin: currentOrigin } = new URL(url);
        // Ignore messages from other origins (e.g. VAD environment during login)
        if (currentOrigin === baseURL) {
            consoleMessages.push({
                type: message.type(),
                message: message.text(),
                toString: () => `${message.type()}: ${message.text()}`,
            });
        }
    });

    await use();

    const mode = await page.locator('html').getAttribute('data-mode');
    const messages = consoleMessages
        .filter((message) => (mode === 'development' ? message.type === 'error' : true))
        .filter(({ message }) => !ignoredMessages.includes(message))
        .map((message) => message.toString());

    expect(messages, 'No console messages should be logged during the test').toEqual([]);
};
