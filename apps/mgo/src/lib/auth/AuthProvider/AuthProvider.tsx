import { useMemo, type ReactNode } from 'react';
import { AuthProvider as OriginalAuthProvider } from 'react-oidc-context';
import { generateNonce } from './generateNonce.ts';

type Props = {
    authority: string;
    client_id: string;
    redirect_uri: string;
    lang?: 'nl' | 'en';
    children: ReactNode;
};

const onSigninCallback = () => window.history.replaceState({}, '', window.location.pathname);

function WrappedAuthProvider({ lang, ...rest }: Props) {
    const nonce = useMemo(() => generateNonce(32), []);

    return (
        <OriginalAuthProvider
            extraQueryParams={{ lang: lang || 'nl', nonce }}
            onSigninCallback={onSigninCallback}
            {...rest}
        />
    );
}

export { WrappedAuthProvider as AuthProvider };
