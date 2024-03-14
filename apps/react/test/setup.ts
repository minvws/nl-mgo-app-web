import { cleanup } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeAll, vi } from 'vitest';
import 'vitest-dom/extend-expect';
import { authState, removeUserMock, resetAuthState, signinRedirectMock } from './auth';
import { config } from './config';

vi.mock('../src/lib/config/config', () => ({ readConfig: () => config }));

vi.mock('react-oidc-context', () => ({
    AuthProvider: ({ children }: { children: ReactNode }) => children,
    /**
     * To control this mocked useAuth, import `authState` from test/auth.ts into
     * your test, mutate its properties and rerender to apply.
     * NB: the return value of this mock satisfies the full AuthState interface,
     * but only partially satisfies AuthContextProps.
     */
    useAuth: () => ({
        ...authState,
        signinRedirect: signinRedirectMock,
        removeUser: removeUserMock,
        settings: {},
    }),
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(() => {
    localStorage.clear();
    resetAuthState();
    cleanup();
});
