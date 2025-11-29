import { useAuth } from '$/auth';
import { LOGIN_CALLBACK_FLAG } from '$/auth/VadAuthProvider/VadAuthProvider';
import { BackButton } from '$/components/BackButton/BackButton';
import { FormattedMessage, useIntl } from '$/intl';
import { Button, ConfirmDialog, Heading, Text, useOnMount } from '@minvws/mgo-ui';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DigiDSvg from './digid.svg?react';

export function Login() {
    const { formatMessage } = useIntl();
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
            <section className="grow">
                <BackButton />

                <div className="mx-auto max-w-md pb-12 md:pb-16 lg:pb-24">
                    <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                        <FormattedMessage id="login.heading" description="Bewijs wie je bent" />
                    </Heading>

                    <Text className="mb-6 md:mb-12" as="p">
                        <FormattedMessage
                            id="login.subheading"
                            description="Kies de manier waarop je wilt inloggen."
                        />
                    </Text>

                    <Button
                        onClick={auth.isLoading ? undefined : auth.login}
                        variant="outline"
                        className="p-4 sm:p-6"
                        fullWidth
                        leftIcon={<DigiDSvg className="mr-2 h-8 w-8 sm:mr-4 sm:h-12 sm:w-12" />}
                        rightIcon="chevron_right"
                    >
                        {auth.isLoading ? (
                            <FormattedMessage id="common.loading" />
                        ) : (
                            <FormattedMessage id="login.digid" />
                        )}
                    </Button>
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
