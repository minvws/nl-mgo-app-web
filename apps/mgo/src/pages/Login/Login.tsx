import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks/index.js';
import { useAuth } from '$/lib/auth';
import { Alert, Button, Container, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { Busy } from './Busy.js';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';

export function Login() {
    const intl = useIntl();
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
            <Helmet title={intl.formatMessage({ id: 'login.heading' })} />
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                {auth.error && (
                    <Alert
                        status="error"
                        label={intl.formatMessage({ id: 'login.error_heading' })}
                        description={intl.formatMessage({ id: 'login.error_subheading' })}
                    />
                )}
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage id="login.heading" description="Bewijs wie je bent" />
                    </h1>
                </Heading>

                <Text className="mb-6 md:mb-12">
                    <FormattedMessage
                        id="login.subheading"
                        description="Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we{' '}
                        <b>jouw gegevens veilig opvragen</b> bij je huisarts, ziekenhuis en andere
                        zorgaanbieders."
                    />
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
                                    <FormattedMessage
                                        id="login.digid"
                                        description="Inloggen met DigiD"
                                    />
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
                                    <FormattedMessage
                                        id="login.european"
                                        description="Inloggen met eIDAS"
                                    />
                                </span>
                            </Button>
                        </li>
                    </ul>
                </Stack>
            </Container>
        </>
    );
}
