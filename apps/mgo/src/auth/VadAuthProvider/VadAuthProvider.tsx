import { type RoutePath } from '$/routing';
import { getAuthUrl } from '$/services/vad/vad';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { VadAuthContext, type VadAuthContextState } from './VadAuthContext';
import {
    USER_INFO_SESSION_STORAGE_KEY,
    getUserInfoFromSession,
    type UserInfo,
} from './getUserInfoFromSession';
import { takeUserInfoFromUrl } from './takeUserInfoFromUrl';

export interface VadAuthProviderProps {
    readonly navigate: (path: RoutePath) => void;
    readonly children: ReactNode;
}

export const LOGIN_CALLBACK_FLAG = 'vad';

export const VadAuthProvider = ({ children, navigate }: VadAuthProviderProps) => {
    const callbackUrl = `${window.location.origin}${window.location.pathname}?${LOGIN_CALLBACK_FLAG}`;
    const [userInfo, setUserInfo] = useState<UserInfo | null>(getUserInfoFromSession());
    const [parsingError, setParsingError] = useState<Error | null>(null);

    useEffect(() => {
        if (userInfo) {
            sessionStorage.setItem(USER_INFO_SESSION_STORAGE_KEY, JSON.stringify(userInfo));
        }
    }, [userInfo]);

    const {
        refetch,
        isLoading,
        error: loadingError,
        data: authUrlResponse,
    } = useQuery({
        queryKey: ['vad-auth', callbackUrl],
        queryFn: () => getAuthUrl({ callbackUrl }),
        enabled: false,
        retry: 0,
    });

    useEffect(() => {
        if (authUrlResponse) {
            window.location.href = authUrlResponse.authz_url;
        }
    }, [authUrlResponse]);

    const login = useCallback(() => {
        refetch();
    }, [refetch]);

    const updateUserInfoFromUrl = useCallback(() => {
        let userInfo: UserInfo | null;
        try {
            userInfo = takeUserInfoFromUrl();
            if (!userInfo) {
                throw new Error('No userinfo found!');
            }
            setUserInfo(userInfo);
            setParsingError(null);
        } catch (error) {
            setParsingError(error as Error);
        }
    }, []);

    const logout = useCallback(() => {
        setUserInfo(null);
        setParsingError(null);
        sessionStorage.clear();
        navigate('/uitgelogd');
    }, [navigate]);

    const contextValue = useMemo<VadAuthContextState>(
        () => ({
            login,
            logout,
            updateUserInfoFromUrl,
            isLoading,
            loadingError,
            parsingError,
            userInfo,
        }),
        [login, logout, updateUserInfoFromUrl, isLoading, loadingError, parsingError, userInfo]
    );

    return <VadAuthContext.Provider value={contextValue}>{children}</VadAuthContext.Provider>;
};
