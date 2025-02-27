import { config } from '$/config';

import { type RouteConfigPaths } from '$/routing/routes.tsx';
import { type ReactNode } from 'react';
import { AuthProvider as OriginalAuthProvider } from 'react-oidc-context';
import { generateNonce } from './generateNonce.ts';

type AuthProviderProps = {
    readonly lang: 'nl';
    readonly children?: ReactNode;
};

const NONCE = generateNonce(32);
const LOGGED_OUT_PATH: RouteConfigPaths = '/uitgelogd';

const onSigninCallback = () => {
    window.history.replaceState({}, '', window.location.pathname);
};

const onRemoveUser = (): void => {
    window.location.replace(LOGGED_OUT_PATH);
    sessionStorage.clear();
};

export function AuthProvider({ lang, ...rest }: AuthProviderProps) {
    return (
        <OriginalAuthProvider
            authority={config.oidc_authority}
            client_id={config.oidc_client_id}
            redirect_uri={config.oidc_redirect_uri}
            extraQueryParams={{ lang: lang, nonce: NONCE }}
            onSigninCallback={onSigninCallback}
            onRemoveUser={onRemoveUser}
            {...rest}
        />
    );
}
