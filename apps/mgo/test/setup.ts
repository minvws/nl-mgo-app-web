import type { Config } from '$/lib/config/config';
import { cleanup } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, vi } from 'vitest';
import 'vitest-dom/extend-expect';

import {
    authState,
    removeUserMock,
    resetAuthState,
    signinRedirectMock,
    signoutRedirectMock,
} from './helpers/auth';

export const config: Config = {
    oidc: {
        authority: 'http://localhost:5000',
        client_id: 'client_id',
        redirect_uri: 'http://localhost:3000',
    },
};

vi.mock('../src/lib/config/config', () => ({ readConfig: () => config }));

vi.mock('zustand');
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
        signoutRedirect: signoutRedirectMock,
        settings: {},
    }),
}));

window.scrollTo = vi.fn;

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({ matches: false, addListener: vi.fn(), removeListener: vi.fn() })),
    });
});

afterEach(() => {
    localStorage.clear();
    resetAuthState();
    cleanup();
});
