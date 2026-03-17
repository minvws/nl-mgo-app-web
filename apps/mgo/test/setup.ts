import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { throwOnConsoleLog } from './helpers/throwOnConsoleLog';

import { faker } from '@faker-js/faker';
import { useConfig } from '@minvws/mgo-ui';
import { MockWorker } from './MockWorker';

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

window.scrollTo = vi.fn;
window.Worker = MockWorker;

vi.mock('zustand');
vi.mock('$/config/app/app', () => ({
    appConfig: {
        enable_debug_logging: true,
        enable_missing_translation_errors: true,
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
        pft_url: faker.internet.url(),
        organizations_url: faker.internet.url(),
        data_service_endpoints_url: faker.internet.url(),
    },
}));

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
