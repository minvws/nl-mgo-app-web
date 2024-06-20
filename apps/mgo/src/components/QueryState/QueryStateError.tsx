import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout } from '../QueryStateLayout/QueryStateLayout';

export interface QueryStateErrorProps extends HTMLAttributes<HTMLElement> {
    readonly title?: string;
}

export function QueryStateError({ title, children, ...rest }: QueryStateErrorProps) {
    const { _ } = useLingui();

    return (
        <QueryStateLayout
            illustration="woman-on-couch-exclamation"
            title={
                title ||
                _(
                    msg({
                        id: 'default.state.error.title',
                        message: `Er ging iets mis`,
                    })
                )
            }
            {...rest}
        >
            {children || (
                <Trans id="default.state.error.description">
                    Onze excuses, er lijkt een probleem te zijn met de verbinding met onze server.
                    We werken eraan om het op te lossen. Probeer het later opnieuw.
                </Trans>
            )}
        </QueryStateLayout>
    );
}
