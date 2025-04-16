import { useAuth } from '$/auth';
import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks/index.js';
import { FormattedMessage, useIntl } from '$/intl';
import { Alert, Button, Container, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';

export function Login() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const auth = useAuth();

    return (
        <>
            <Helmet title={formatMessage('login.heading')} />
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                {(auth.loadingError || auth.parsingError) && (
                    <Alert
                        className="mb-4 md:mb-6"
                        status="error"
                        label={formatMessage('login.error_heading')}
                        aria-label={formatMessage('common.voice_over_close')}
                    >
                        <FormattedMessage id="login.error_subheading" />
                    </Alert>
                )}
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage id="login.heading" description="Bewijs wie je bent" />
                    </h1>
                </Heading>

                <Text className="mb-6 md:mb-12">
                    <FormattedMessage
                        id="login.subheading"
                        description="Kies de manier waarop je wilt inloggen."
                    />
                </Text>

                <Stack asChild>
                    <ul>
                        <li>
                            <Button
                                onClick={auth.isLoading ? undefined : auth.login}
                                variant="outline"
                                className="w-full p-4 sm:p-6"
                                leftIcon={
                                    <DigiDSvg className="mr-2 h-8 w-8 sm:mr-4 sm:h-12 sm:w-12" />
                                }
                                rightIcon="chevron-right"
                            >
                                <span className="flex flex-grow justify-start">
                                    {auth.isLoading ? (
                                        <FormattedMessage id="common.loading" />
                                    ) : (
                                        <FormattedMessage id="login.digid" />
                                    )}
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
                                    <FormattedMessage id="login.european" />
                                </span>
                            </Button>
                        </li>
                    </ul>
                </Stack>
            </Container>
        </>
    );
}
