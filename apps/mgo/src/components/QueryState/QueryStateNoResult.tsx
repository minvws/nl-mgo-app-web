import { Trans, msg } from '@lingui/macro';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout, type QueryStateLayoutProps } from '../QueryStateLayout/QueryStateLayout';
import { useLingui } from '@lingui/react';

export interface QueryStateNoResultProps
    extends HTMLAttributes<HTMLElement>,
        QueryStateLayoutProps {}

export function QueryStateNoResult({
    title,
    children,
    illustration = 'woman-on-couch',
    ...rest
}: QueryStateNoResultProps) {
    const { _ } = useLingui();

    return (
        <QueryStateLayout
            illustration={illustration}
            title={
                title ||
                _(
                    msg({
                        id: 'default.state.no_results.title',
                        message: `Geen gegevens gevonden`,
                    })
                )
            }
            {...rest}
        >
            {children || (
                <Trans id="default.state.no_results.description">
                    We hebben geen gegevens van jou gevonden in dit dossier van de zorgaanbieder.
                    Klopt dit niet? Vraag het aan je zorgaanbieder voor meer informatie.
                </Trans>
            )}
        </QueryStateLayout>
    );
}
