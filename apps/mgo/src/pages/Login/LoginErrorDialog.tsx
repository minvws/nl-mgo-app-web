import { useIntl } from '$/intl';
import { ConfirmDialog } from '@minvws/mgo-ui';
import { useEffect, useRef, useState } from 'react';

export interface LoginErrorDialogProps {
    readonly authError: Error | null;
}

export function LoginErrorDialog({ authError }: LoginErrorDialogProps) {
    const { formatMessage } = useIntl();
    const prevAuthError = useRef(authError);
    const [showErrorDialog, setShowErrorDialog] = useState(Boolean(authError));

    useEffect(() => {
        if (!prevAuthError.current && authError) {
            setShowErrorDialog(true); // eslint-disable-line react-hooks/set-state-in-effect
        }
        prevAuthError.current = authError;
    }, [authError]);

    return (
        <ConfirmDialog
            title={formatMessage('login.error_heading')}
            description={formatMessage('login.error_subheading')}
            confirmButtonText={formatMessage('common.ok')}
            closeButtonAriaLabel={formatMessage('common.voice_over_close')}
            onConfirm={() => setShowErrorDialog(false)}
            open={showErrorDialog}
            onOpenChange={setShowErrorDialog}
        />
    );
}
