import 'vitest-dom/extend-expect';

import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { config } from 'react-transition-group';
import { throwOnConsoleLog } from './helpers/throwOnConsoleLog';

config.disabled = true;

throwOnConsoleLog({
    logMethods: ['warn', 'error'],
});

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(cleanup);
