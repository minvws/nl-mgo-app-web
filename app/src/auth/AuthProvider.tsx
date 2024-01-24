import { type ReactNode, useMemo } from 'react';
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

export default function WrappedAuthProvider(props: Props) {
    const nonce = useMemo(() => generateNonce(32), []);
    return (
        <OriginalAuthProvider
            authority={props.authority}
            client_id={props.client_id}
            redirect_uri={props.redirect_uri}
            extraQueryParams={{ lang: props.lang || 'nl', nonce }}
            onSigninCallback={onSigninCallback}
            children={props.children}
        />
    );
}
