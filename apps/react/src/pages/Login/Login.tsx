import { useNavFocusRef } from '$/hooks/index.js';
import { useAuth } from '$/lib/auth';
import { Trans, msg } from '@lingui/macro';
import { Alert, Button, Container, Heading, Stack } from '@minvws/mgo-react-ui';
import { Busy } from './Busy.js';
import { useLingui } from '@lingui/react';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';

export function Login() {
    const { _ } = useLingui();
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    let status = null;

    if (auth.activeNavigator === 'signinSilent') {
        status = <Busy task="inloggen" />;
    } else if (auth.activeNavigator === 'signoutRedirect') {
        status = <Busy task="uitloggen" />;
    } else if (auth.isLoading) {
        status = <Busy task="laden" />;
    }

    if (status) {
        return <Container className="max-w-md py-10">{status}</Container>;
    }

    return (
        <Container className="max-w-md py-10">
            {auth.error && (
                <Alert
                    status="error"
                    label={_(msg({ id: 'login.error.label', message: 'Inloggen is niet gelukt' }))}
                    description={_(
                        msg({ id: 'login.error.description', message: 'Probeer het nog een keer' })
                    )}
                />
            )}
            <Heading asChild size="lg" className="mb-8">
                <h1 ref={navFocusRef}>
                    <Trans id="login.heading">Bewijs wie je bent</Trans>
                </h1>
            </Heading>
            <p className="mb-12 text-lg">
                <Trans id="login.description">
                    Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we{' '}
                    <b>jouw gegevens veilig opvragen</b> bij je huisarts, ziekenhuis en andere
                    zorgaanbieders.
                </Trans>
            </p>

            <Stack asChild>
                <ul>
                    <li>
                        <Button
                            onClick={() => void auth.signinRedirect()}
                            variant="outline"
                            className="w-full p-6"
                            leftIcon={<DigiDSvg className="mr-4 h-12 w-12" />}
                            rightIcon="chevron-right"
                        >
                            <span className="flex flex-grow justify-start">
                                <Trans id="login.digid">Inloggen met DigiD</Trans>
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            className="w-full p-6"
                            leftIcon={<EIDASSvg className="mr-4 h-12 w-12" />}
                            rightIcon="chevron-right"
                        >
                            <span className="flex flex-grow justify-start">
                                <Trans id="login.european">Inloggen met eIDAS</Trans>
                            </span>
                        </Button>
                    </li>
                </ul>
            </Stack>
        </Container>
    );
}
