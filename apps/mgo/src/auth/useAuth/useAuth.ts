import { useContext } from 'react';
import { VadAuthContext } from '../VadAuthProvider/VadAuthContext';

export function useAuth() {
    const context = useContext(VadAuthContext);

    return Object.freeze({
        ...context,
        isAuthenticated: Boolean(context.userInfo),
    });
}

export type AuthState = ReturnType<typeof useAuth>;
