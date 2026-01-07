import { faker } from '@faker-js/faker';
import { afterEach, expect, test, vi } from 'vitest';
import { LogLevel } from '../index.js';

afterEach(() => {
    vi.unstubAllGlobals();
});

test.each<LogLevel>(['debug', 'info', 'warn', 'error'])(
    '%s - delegates to console',
    async (method) => {
        const consoleSpy = vi.spyOn(console, method).mockImplementation(vi.fn());
        vi.resetModules();
        const { consoleLogger } = await import('./console.js');

        const logMessage = faker.lorem.sentence();
        consoleLogger[method](logMessage);
        expect(consoleSpy).toHaveBeenCalledWith(logMessage);
    }
);

test.each<LogLevel>(['debug', 'info', 'warn', 'error'])(
    '%s - does not throw if console is missing',
    async (method) => {
        vi.stubGlobal('console', undefined);
        vi.resetModules();
        const { consoleLogger } = await import('./console.js');
        expect(() => consoleLogger[method](faker.lorem.sentence())).not.toThrow();
    }
);

test.each<LogLevel>(['debug', 'info', 'warn', 'error'])(
    '%s - does not throw if console method is missing',
    async (method) => {
        vi.stubGlobal('console', { [method]: undefined });
        vi.resetModules();
        const { consoleLogger } = await import('./console.js');
        expect(() => consoleLogger[method](faker.lorem.sentence())).not.toThrow();
    }
);
