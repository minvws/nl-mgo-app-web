import { type DefaultError as DefaultQueryError, type UseQueryResult } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { DefaultError } from './DefaultError';
import { DefaultPending } from './DefaultPending';
import { DefaultNoResult } from './DefaultNoResult';

export type QueryStateProps<TData = unknown, TError = DefaultQueryError> = Pick<
    UseQueryResult<TData, TError>,
    'data' | 'error' | 'status'
> & {
    renderPending?: ReactNode;
    renderNoResult?: ReactNode;
    renderError?: ReactNode | ((props: { error: TError | null }) => ReactNode);
    renderResult: ReactNode | ((props: { data: NonNullable<TData> }) => ReactNode);
};

const isEmpty = (data: unknown) =>
    data === null || data === undefined || (Array.isArray(data) && data.length === 0);

export function QueryState<TData = unknown, TError = DefaultQueryError>({
    error,
    data,
    status,
    renderResult,
    renderNoResult = <DefaultNoResult />,
    renderPending = <DefaultPending />,
    renderError = DefaultError,
}: QueryStateProps<TData, TError>) {
    switch (status) {
        case 'pending':
            return renderPending;
        case 'error':
            return typeof renderError === 'function' ? renderError({ error }) : renderError;
        case 'success':
            if (isEmpty(data)) {
                return renderNoResult;
            }
            return typeof renderResult === 'function'
                ? renderResult({ data: data! })
                : renderResult;
        default:
            throw new Error(`Unhandled status: ${status}`);
    }
}
