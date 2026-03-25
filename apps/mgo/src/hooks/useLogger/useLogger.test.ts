import { beforeEach, expect, test, vi } from 'vitest';

import { consoleLogger, noopLogger } from '@minvws/mgo-logging';
import { renderHook } from '@testing-library/react';
import { useLogger } from './useLogger';

const hoisted = vi.hoisted(() => {
    return {
        appConfig: { enable_debug_logging: true },
    };
});

vi.mock('$/config', () => ({
    appConfig: hoisted.appConfig,
}));

beforeEach(() => {
    vi.resetModules();
});

test('useLogger returns noopLogger if enable_debug_logging is false', async () => {
    hoisted.appConfig.enable_debug_logging = false;
    const { result } = renderHook(() => useLogger());
    expect(result.current.log).toBe(noopLogger);
});

test('useLogger returns consoleLogger if enable_debug_logging is true', async () => {
    hoisted.appConfig.enable_debug_logging = true;
    const { result } = renderHook(() => useLogger());
    expect(result.current.log).toBe(consoleLogger);
});
