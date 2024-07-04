import { type HTMLAttributes } from 'react';
import { QueryStateLayout } from '../QueryStateLayout/QueryStateLayout';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export interface QueryStateLoadingProps extends HTMLAttributes<HTMLElement> {}

export function QueryStateLoading({ children, ...rest }: QueryStateLoadingProps) {
    return (
        <QueryStateLayout {...rest}>
            <div className="py-8 text-center md:py-16">
                <LoadingSpinner>{children}</LoadingSpinner>
            </div>
        </QueryStateLayout>
    );
}
