import { Trans, msg } from '@lingui/macro';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout, type QueryStateLayoutProps } from '../QueryStateLayout/QueryStateLayout';
import { useLingui } from '@lingui/react';

export interface QueryStateNoResultProps
    extends Omit<HTMLAttributes<HTMLElement>, 'title'>,
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
                        id: 'common.no_results_heading',
                        message: `Geen gegevens gevonden`,
                    })
                )
            }
            {...rest}
        >
            {children || (
                <Trans id="common.no_results_subheading">
                    We hebben geen gegevens van jou gevonden in dit dossier van de zorgaanbieder.
                    Klopt dit niet? Vraag het aan je zorgaanbieder voor meer informatie.
                </Trans>
            )}
        </QueryStateLayout>
    );
}
