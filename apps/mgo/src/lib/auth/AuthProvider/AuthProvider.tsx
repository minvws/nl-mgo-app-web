import { useMemo, type ReactNode } from 'react';
import { AuthProvider as OriginalAuthProvider } from 'react-oidc-context';
import { generateNonce } from './generateNonce.ts';
import { type RouteConfigPaths } from '$/routing/routes.tsx';

type Props = {
    readonly authority: string;
    readonly client_id: string;
    readonly redirect_uri: string;
    readonly lang?: 'nl' | 'en';
    readonly children: ReactNode;
};

const onSigninCallback = () => window.history.replaceState({}, '', window.location.pathname);

const loggedOuthPath: RouteConfigPaths = '/uitgelogd';
const onRemoveUser = (): void => {
    window.location.replace(loggedOuthPath);
};

function WrappedAuthProvider({ lang, ...rest }: Props) {
    const nonce = useMemo(() => generateNonce(32), []);

    return (
        <OriginalAuthProvider
            extraQueryParams={{ lang: lang ?? 'nl', nonce }}
            onSigninCallback={onSigninCallback}
            onRemoveUser={onRemoveUser}
            {...rest}
        />
    );
}

export { WrappedAuthProvider as AuthProvider };
