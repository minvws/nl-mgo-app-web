import { useIntl } from '$/intl';
import { ConfirmDialog, useOpenState } from '@minvws/mgo-ui';
import { useEffect, useRef } from 'react';

export interface LoginErrorDialogProps {
    readonly authError: Error | null;
}

export function LoginErrorDialog({ authError }: LoginErrorDialogProps) {
    const { formatMessage } = useIntl();
    const prevAuthError = useRef(authError);
    const { isOpen, open, setIsOpen, close } = useOpenState({ defaultOpen: Boolean(authError) });

    useEffect(() => {
        if (!prevAuthError.current && authError) {
            open();
        }
        prevAuthError.current = authError;
    }, [authError, open]);

    return (
        <ConfirmDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <ConfirmDialog.Content
                title={formatMessage('login.error_heading')}
                description={formatMessage('login.error_subheading')}
                confirmButtonText={formatMessage('common.ok')}
                closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                onConfirm={close}
            />
        </ConfirmDialog.Root>
    );
}
