import { useNavFocusRef } from '$/hooks/index.js';
import { useAuth } from '$/lib/auth';
import { Trans, msg } from '@lingui/macro';
import { Alert, Button, Container, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Busy } from './Busy.js';
import { useLingui } from '@lingui/react';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';
import { BackButton } from '$/components/BackButton/BackButton';
import { Helmet } from 'react-helmet-async';

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
        return <Container className="max-w-md py-8">{status}</Container>;
    }

    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'login.heading',
                        message: 'Bewijs wie je bent',
                    })
                )}
            />
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                {auth.error && (
                    <Alert
                        status="error"
                        label={_(
                            msg({ id: 'login.error_heading', message: 'Inloggen is niet gelukt' })
                        )}
                        description={_(
                            msg({
                                id: 'login.error_subheading',
                                message: 'Probeer het nog een keer',
                            })
                        )}
                    />
                )}
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="login.heading">Bewijs wie je bent</Trans>
                    </h1>
                </Heading>

                <Text className="mb-6 md:mb-12">
                    <Trans id="login_subheading">
                        Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we{' '}
                        <b>jouw gegevens veilig opvragen</b> bij je huisarts, ziekenhuis en andere
                        zorgaanbieders.
                    </Trans>
                </Text>

                <Stack asChild>
                    <ul>
                        <li>
                            <Button
                                onClick={() => auth.signinRedirect()}
                                variant="outline"
                                className="w-full p-4 sm:p-6"
                                leftIcon={
                                    <DigiDSvg className="mr-2 h-8 w-8 sm:mr-4 sm:h-12 sm:w-12" />
                                }
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
                                className="w-full p-4 sm:p-6"
                                leftIcon={
                                    <EIDASSvg className="mr-2 h-8 w-8 sm:mr-4 sm:h-12 sm:w-12" />
                                }
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
        </>
    );
}
