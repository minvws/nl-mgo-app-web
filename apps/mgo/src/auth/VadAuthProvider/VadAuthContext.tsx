import { createContext } from 'react';
import { type UserInfo } from './getUserInfoFromSession';

export interface VadAuthContextState {
    readonly logout: () => void;
    readonly login: () => void;
    readonly isLoading: boolean;
    readonly loadingError: Error | null;
    readonly parsingError: Error | null;
    readonly userInfo: UserInfo | null;
    readonly updateUserInfoFromUrl: () => void;
}

export const VadAuthContext = createContext<VadAuthContextState>({
    /* c8 ignore start - this is a default value for when there is no provider which doesn't happen */
    login: () => {},
    logout: () => {},
    updateUserInfoFromUrl: () => {},
    /* c8 ignore end */
    loadingError: null,
    parsingError: null,
    isLoading: false,
    userInfo: null,
});
