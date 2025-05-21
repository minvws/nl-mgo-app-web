import { type HTMLAttributes } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { QueryStateLayout } from '../QueryStateLayout/QueryStateLayout';

export type QueryStateLoadingProps = HTMLAttributes<HTMLElement>;

export function QueryStateLoading({ children, ...rest }: QueryStateLoadingProps) {
    return (
        <QueryStateLayout {...rest}>
            <div className="py-8 text-center md:py-16">
                <LoadingSpinner>{children}</LoadingSpinner>
            </div>
        </QueryStateLayout>
    );
}
