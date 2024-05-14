import { Trans, msg } from '@lingui/macro';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout, type QueryStateLayoutProps } from '../QueryStateLayout/QueryStateLayout';
import { useLingui } from '@lingui/react';

export interface QueryStateNoResultProps extends HTMLAttributes<HTMLElement> {
    title?: QueryStateLayoutProps['title'];
}

export function QueryStateNoResult({ title, children, ...rest }: QueryStateNoResultProps) {
    const { _ } = useLingui();

    return (
        <QueryStateLayout
            illustration="woman-on-couch"
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
                    Klopt dit niet? Vraag het aan je zorgverlener voor meer informatie.
                </Trans>
            )}
        </QueryStateLayout>
    );
}
