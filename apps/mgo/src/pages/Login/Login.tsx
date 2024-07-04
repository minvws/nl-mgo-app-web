import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks/index.js';
import { useAuth } from '$/lib/auth';
import { Alert, Button, Container, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';
import { useLocation } from '$/routing';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';

export function Login() {
    const intl = useIntl();
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { state } = useLocation();

    let status = null;

    if (auth.activeNavigator === 'signinSilent') {
        status = 'inloggen';
    } else if (auth.activeNavigator === 'signoutRedirect') {
        status = 'uitloggen';
    } else if (auth.isLoading) {
        status = 'laden';
    }

    return (
        <>
            <Helmet title={intl.formatMessage({ id: 'login.heading' })} />
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                {(auth.error || state?.authError) && (
                    <Alert
                        className="mb-4 md:mb-6"
                        status="error"
                        label={intl.formatMessage({ id: 'login.error_heading' })}
                        description={intl.formatMessage({ id: 'login.error_subheading' })}
                        aria-label={intl.formatMessage({ id: 'common.voice_over_close' })}
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
                        description="Kies de manier waarop je wilt inloggen. Zo kunnen we jouw gegevens veilig ophalen bij je huisarts, ziekenhuis en andere zorgaanbieders."
                    />
                </Text>

                {status ? (
                    <LoadingSpinner>Bezig met {status}...</LoadingSpinner>
                ) : (
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
                )}
            </Container>
        </>
    );
}
