import 'vitest-dom/extend-expect';

import { beforeAll, vi } from 'vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

vi.mock('react-oidc-context');
vi.mock('../src/lib/config');

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(cleanup);
