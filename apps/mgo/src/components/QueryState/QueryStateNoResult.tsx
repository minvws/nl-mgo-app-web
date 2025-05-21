import { FormattedMessage, useIntl } from '$/intl';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout, type QueryStateLayoutProps } from '../QueryStateLayout/QueryStateLayout';

export interface QueryStateNoResultProps
    extends Omit<HTMLAttributes<HTMLElement>, 'title'>,
        QueryStateLayoutProps {}

export function QueryStateNoResult({
    title,
    children,
    illustration = 'woman-on-couch',
    ...rest
}: QueryStateNoResultProps) {
    const { formatMessage } = useIntl();

    return (
        <QueryStateLayout
            illustration={illustration}
            title={title ?? formatMessage('common.no_results_heading')}
            {...rest}
        >
            {children || (
                <FormattedMessage
                    id="common.no_results_subheading"
                    description="We hebben geen gegevens van jou gevonden in dit dossier van de zorgaanbieder. Klopt dit niet? Vraag het aan je zorgaanbieder voor meer informatie."
                />
            )}
        </QueryStateLayout>
    );
}
