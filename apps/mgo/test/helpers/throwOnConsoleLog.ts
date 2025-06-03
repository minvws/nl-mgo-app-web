/* c8 ignore start */

import { flushCallStack } from '@minvws/mgo-utils';
import { uniqBy } from 'lodash';
import { afterEach, beforeEach } from 'vitest';

type ConsoleLogMethod = 'log' | 'debug' | 'info' | 'warn' | 'error';
type ConsoleLogMessage = {
    method: ConsoleLogMethod;
    message: string;
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
            ({ message, method }) => `${method}:  ${message}`
        );
        throw new Error(
            `The following messages were logged to the console during the test:\n\n` +
                errorMessages.join('\n\n')
        );
    }
});

function patchConsoleMethod(method: ConsoleLogMethod) {
    window.console[method] = (message?: unknown) => {
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

        logMessages.push({ method, message: logMessage });
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
