import { type AuthState } from '$/auth';
import { vi } from 'vitest';

export function authState(state: Partial<AuthState> = {}): AuthState {
    return {
        isAuthenticated: false,
        isLoading: false,
        loadingError: null,
        parsingError: null,
        login: vi.fn(),
        logout: vi.fn(),
        updateUserInfoFromUrl: vi.fn(),
        userInfo: null,
        ...state,
    };
}
