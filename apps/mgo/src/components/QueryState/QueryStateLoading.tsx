import { Trans } from '@lingui/macro';
import { Spinner } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { QueryStateLayout } from '../QueryStateLayout/QueryStateLayout';

export interface QueryStateLoadingProps extends HTMLAttributes<HTMLElement> {}

export function QueryStateLoading({ children, ...rest }: QueryStateLoadingProps) {
    return (
        <QueryStateLayout {...rest}>
            <div className="py-8 text-center md:py-16">
                <Spinner className="mx-auto mb-4" />
                <div aria-live="polite">
                    {children || (
                        <Trans id="default.state.loading.description">Bezig met laden...</Trans>
                    )}
                </div>
            </div>
        </QueryStateLayout>
    );
}
