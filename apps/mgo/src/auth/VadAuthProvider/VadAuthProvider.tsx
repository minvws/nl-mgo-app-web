import { type RoutePath } from '$/routing';
import { getAuthUrl } from '$/services/vad/vad';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { VadAuthContext, type VadAuthContextState } from './VadAuthContext';
import { USER_INFO_SESSION_STORAGE_KEY, getUserInfo, type UserInfo } from './getUserInfo';

export interface VadAuthProviderProps {
    readonly navigate: (path: RoutePath) => void;
    readonly children: ReactNode;
}

export const VadAuthProvider = ({ children, navigate }: VadAuthProviderProps) => {
    const callbackUrl = window.location.origin;
    const { userInfo: initialUserInfo, error: userInfoError } = getUserInfo();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(initialUserInfo);
    const [parsingError, setParsingError] = useState<Error | null>(userInfoError);

    useEffect(() => {
        sessionStorage.setItem(USER_INFO_SESSION_STORAGE_KEY, JSON.stringify(userInfo));
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

    const logout = useCallback(() => {
        setUserInfo(null);
        setParsingError(null);
        sessionStorage.clear();
        navigate('/uitgelogd');
    }, [setUserInfo, setParsingError, navigate]);

    const contextValue = useMemo<VadAuthContextState>(
        () => ({
            login,
            logout,
            isLoading,
            loadingError,
            parsingError,
            userInfo,
        }),
        [login, logout, isLoading, loadingError, parsingError, userInfo]
    );

    return <VadAuthContext.Provider value={contextValue}>{children}</VadAuthContext.Provider>;
};
