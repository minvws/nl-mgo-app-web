import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { throwOnConsoleLog } from './helpers/throwOnConsoleLog';

import { useConfig } from '@minvws/mgo-ui';
import { MockWorker } from './MockWorker';
import { appConfig } from './appConfig';

configure({
    // Remove the huge error output from `testing-library`
    getElementError(message) {
        // Only print the error message, not the full stack trace (and matching suggestions)
        const error = new Error(message ? message.split('\n')[0] : 'no message');
        delete error.stack;
        error.name = 'TestingLibraryElementError';
        return error;
    },
});

vi.mock('zustand');
vi.mock('$/config/app/app', () => ({ appConfig }));

window.scrollTo = vi.fn;
window.Worker = MockWorker;

throwOnConsoleLog({
    logMethods: ['warn', 'error'],
    ignoreMessages: [/React Router Future Flag Warning:/],
});

beforeAll(() => {
    useConfig().animations = false;
});

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: false, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(() => {
    localStorage.clear();
    cleanup();
});
