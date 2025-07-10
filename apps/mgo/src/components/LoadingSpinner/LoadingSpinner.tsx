import { useIntl } from '$/intl';
import { Spinner, Text } from '@minvws/mgo-ui';
import { type ReactNode } from 'react';

type LoadingSpinnerProps = {
    readonly children?: ReactNode;
};
export function LoadingSpinner({ children }: LoadingSpinnerProps) {
    const { formatMessage } = useIntl();
    const loadingText = formatMessage('common.loading');

    return (
        <Text asChild className="text-center">
            <div>
                <Spinner className="mx-auto mb-4" aria-label={loadingText} />
                <div aria-live="polite">{children ?? loadingText}</div>
            </div>
        </Text>
    );
}
