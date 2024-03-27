import { useNavFocusRef } from '$/hooks/index.js';
import { useAuth } from '$/lib/auth';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, Stack } from '@minvws/mgo-react-ui';
import { Busy } from './Busy.js';
import { Error } from './Error.js';

export function Login() {
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    let status = null;

    if (auth.activeNavigator === 'signinSilent') {
        status = <Busy task="inloggen" />;
    } else if (auth.activeNavigator === 'signoutRedirect') {
        status = <Busy task="uitloggen" />;
    } else if (auth.isLoading) {
        status = <Busy task="laden" />;
    } else if (auth.error) {
        status = <Error error={auth.error} />;
    }

    if (status) {
        return <Container className="max-w-md py-10">{status}</Container>;
    }

    return (
        <Container className="max-w-md py-10">
            <div className="max-w-sm">
                <Heading asChild size="lg" className="mb-8">
                    <h1 ref={navFocusRef}>
                        <Trans id="login.heading">Bewijs wie je bent</Trans>
                    </h1>
                </Heading>
                <p className="mb-8 text-xl">
                    <Trans id="login.description">
                        Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we jouw
                        gegevens veilig opvragen bij je huisarts, ziekenhuizen en andere
                        zorgverleners.
                    </Trans>
                </p>
            </div>

            <Stack asChild>
                <ul>
                    <li>
                        <Button
                            onClick={() => void auth.signinRedirect()}
                            variant="outline"
                            className="w-full"
                        >
                            <Trans id="login.digid">Inloggen met DigiD</Trans>
                        </Button>
                    </li>
                    <li>
                        <Button isDisabled variant="outline" className="w-full">
                            <Trans id="login.representative">Inloggen als gemachtigde</Trans>
                        </Button>
                    </li>
                    <li>
                        <Button isDisabled variant="outline" className="w-full">
                            <Trans id="login.european">European login</Trans>
                        </Button>
                    </li>
                </ul>
            </Stack>
        </Container>
    );
}
