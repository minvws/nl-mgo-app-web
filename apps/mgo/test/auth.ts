import type { AuthState } from 'react-oidc-context';
import { vi } from 'vitest';

export const authState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    activeNavigator: undefined,
    error: undefined,
};

export const resetAuthState = () => {
    authState.user = null;
    authState.isLoading = false;
    authState.isAuthenticated = false;
    authState.activeNavigator = undefined;
    authState.error = undefined;
};

export const signinRedirectMock = vi.fn();

export const removeUserMock = vi.fn();

export const setAuthStateAuthenticated = () => {
    authState.isAuthenticated = true;
    // @ts-expect-error Doesn't satify the oidc-client-ts `User` class type, but is good enough for tests.
    authState.user = {
        access_token: 'access_token',
        token_type: 'Bearer',
        profile: {
            iss: 'http://localhost:5000',
            sub: 'unique_user_id',
            aud: ['client_id'],
            iat: Math.floor(Date.now()),
            exp: Math.floor(Date.now()) + 900,
        },
        state: 'some_unique_state_string',
    };
};
