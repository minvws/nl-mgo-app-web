import { faker } from '@faker-js/faker';
import { afterEach, expect, test, vi } from 'vitest';
import { LogLevel } from '../index.js';

afterEach(() => {
    vi.unstubAllGlobals();
});

test.each<LogLevel>(['debug', 'info', 'warn', 'error'])('%s - does nothing', async (method) => {
    vi.resetModules();
    const consoleSpy = vi.spyOn(console, method).mockImplementation(vi.fn());
    const { noopLogger } = await import('./noop.js');
    noopLogger[method](faker.lorem.sentence());
    expect(consoleSpy).not.toHaveBeenCalled();
});
