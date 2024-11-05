import { Spinner, Text } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';

export function LoadingSpinner({ children }: HTMLAttributes<HTMLElement>) {
    const intl = useIntl();
    const loadingText = intl.formatMessage({ id: 'common.loading' });

    return (
        <Text asChild className="text-center">
            <div>
                <Spinner className="mx-auto mb-4" aria-label={loadingText} />
                <div aria-live="polite">{children || loadingText}</div>
            </div>
        </Text>
    );
}
