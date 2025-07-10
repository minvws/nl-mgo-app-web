import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';
import 'vitest-dom/extend-expect';
import { useConfig } from '../src/hooks/useConfig/useConfig';
import { throwOnConsoleLog } from './helpers/throwOnConsoleLog';

throwOnConsoleLog({
    logMethods: ['warn', 'error'],
});

beforeAll(() => {
    useConfig().animations = false;

    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(cleanup);
