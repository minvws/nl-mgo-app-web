import { FormattedMessage, useIntl } from '$/intl';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout } from '../QueryStateLayout/QueryStateLayout';

export interface QueryStateErrorProps extends HTMLAttributes<HTMLElement> {
    readonly title?: string;
}

export function QueryStateError({ title, children, ...rest }: QueryStateErrorProps) {
    const { formatMessage } = useIntl();

    return (
        <QueryStateLayout
            illustration="woman-on-couch-exclamation"
            title={title ?? formatMessage('common.error_heading')}
            {...rest}
        >
            {children || (
                <FormattedMessage
                    id="common.error_subheading"
                    description="Onze excuses, er lijkt een probleem te zijn met de verbinding met onze server. We werken eraan om het op te lossen. Probeer het later opnieuw."
                />
            )}
        </QueryStateLayout>
    );
}
