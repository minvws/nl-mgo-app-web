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
