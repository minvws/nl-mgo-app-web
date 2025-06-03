import { useAuth } from '$/auth';
import { LOGIN_CALLBACK_FLAG } from '$/auth/VadAuthProvider/VadAuthProvider';
import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks/index.js';
import { FormattedMessage, useIntl } from '$/intl';
import { Button, ConfirmDialog, Heading, Stack, Text, useOnMount } from '@minvws/mgo-ui';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DigiDSvg from './digid.svg?react';
import EIDASSvg from './eidas.svg?react';

export function Login() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const auth = useAuth();
    const [showErrorDialog, setShowErrorDialog] = useState(Boolean(auth.parsingError));

    useOnMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(LOGIN_CALLBACK_FLAG)) {
            auth.updateUserInfoFromUrl();
        }
    });

    useEffect(() => {
        if (auth.parsingError || auth.loadingError) {
            setShowErrorDialog(true);
        }
    }, [auth.loadingError, auth.parsingError]);

    return (
        <>
            <Helmet title={formatMessage('login.heading')} />
            <section className="flex-grow">
                <BackButton />

                <div className="mx-auto max-w-md pb-12 md:pb-16 lg:pb-24">
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
                </div>

                <ConfirmDialog
                    title={formatMessage('login.error_heading')}
                    description={formatMessage('login.error_subheading')}
                    confirmButtonText={formatMessage('common.ok')}
                    closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                    onConfirm={() => setShowErrorDialog(false)}
                    open={showErrorDialog}
                    onOpenChange={setShowErrorDialog}
                />
            </section>
        </>
    );
}
