import 'vitest-dom/extend-expect';

import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(cleanup);
