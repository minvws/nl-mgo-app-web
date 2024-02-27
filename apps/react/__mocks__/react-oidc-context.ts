import type { ReactNode } from 'react';
import { authState, signinRedirectMock, removeUserMock } from '$test/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => children;

/**
 * To control this mocked useAuth, import `authState` from test/auth.ts into
 * your test, mutate its properties and rerender to apply. NB: the return value
 * of this mock satisfies the full AuthState interface, but only partially
 * satisfies AuthContextProps.
 */
export const useAuth = () => ({
    ...authState,
    signinRedirect: signinRedirectMock,
    removeUser: removeUserMock,
    settings: {},
});
