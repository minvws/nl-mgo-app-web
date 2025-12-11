import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import 'vitest-dom/extend-expect';
import { throwOnConsoleLog } from './helpers/throwOnConsoleLog';

import { useConfig } from '@minvws/mgo-ui';

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

vi.mock('$/config/app/app', () => {
    return {
        appConfig: {
            load_url: 'https://lo-ad.test.mgo.irealisatie.nl',
            dva_url: 'https://dvp-proxy.test.mgo.irealisatie.nl',
            pft_url: 'https://app-api.test.mgo.irealisatie.nl',
        },
    };
});

vi.mock('zustand');

throwOnConsoleLog({
    logMethods: ['warn', 'error'],
    ignoreMessages: [/React Router Future Flag Warning:/],
});

window.scrollTo = vi.fn;

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
