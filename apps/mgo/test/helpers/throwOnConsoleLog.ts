/* v8 ignore start */

import { flushCallStack } from '@minvws/mgo-utils';
import { uniqBy } from 'lodash';
import util from 'node:util';
import { afterEach, beforeEach } from 'vitest';

type ConsoleLogMethod = 'log' | 'debug' | 'info' | 'warn' | 'error';
type ConsoleLogMessage = {
    method: ConsoleLogMethod;
    message: string;
    args: unknown[];
};
type ThrowLogConfig = {
    logMethods: ConsoleLogMethod[];
    ignoreMessages?: (string | RegExp)[];
};

let isConfigured = false;
let ignoreLogMessages: (string | RegExp)[] = [];
let logMessages: ConsoleLogMessage[] = [];

beforeEach(() => {
    logMessages = [];
});

afterEach(async () => {
    await flushCallStack();

    if (logMessages.length) {
        const errorMessages = uniqBy(logMessages, ({ message }) => message).map(
            ({ message, method, args }) => {
                return `[${method}] ${util.format(message, ...args)}`;
            }
        );
        throw new Error(
            `${logMessages.length} console messages were logged to the console during the test. ${errorMessages.length} unique messages:\n\n` +
                errorMessages.join('\n\n')
        );
    }
});

function patchConsoleMethod(method: ConsoleLogMethod) {
    global.console[method] = (message?: unknown, ...args: unknown[]) => {
        const logMessage =
            typeof message === 'string'
                ? message
                : ((message as Error)?.message ?? 'unknown error message');

        const ignoreMessage = ignoreLogMessages.find((ignoreMessage) => {
            if (ignoreMessage instanceof RegExp) {
                return ignoreMessage.test(logMessage);
            }

            return ignoreMessage === logMessage;
        });

        if (ignoreMessage) {
            return;
        }

        logMessages.push({ method, message: logMessage, args });
    };
}

export function throwOnConsoleLog({ logMethods, ignoreMessages }: ThrowLogConfig) {
    if (isConfigured) {
        throw new Error('Can only configure "throw on log" once!');
    }

    isConfigured = true;
    ignoreLogMessages = ignoreMessages ?? [];
    logMethods.forEach(patchConsoleMethod);
}
