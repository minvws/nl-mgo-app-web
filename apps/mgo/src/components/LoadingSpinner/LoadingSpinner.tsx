import { Spinner, Text } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

export function LoadingSpinner({ children }: HTMLAttributes<HTMLElement>) {
    return (
        <Text asChild className="text-center">
            <div>
                <Spinner className="mx-auto mb-4" />
                <div aria-live="polite">
                    {children || (
                        <FormattedMessage id="common.loading" description="Bezig met laden..." />
                    )}
                </div>
            </div>
        </Text>
    );
}
