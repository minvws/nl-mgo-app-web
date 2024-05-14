import { type DefaultError as DefaultQueryError, type UseQueryResult } from '@tanstack/react-query';
import { Fragment, type ReactNode } from 'react';
import { QueryStateError } from './QueryStateError';
import { QueryStateLoading } from './QueryStateLoading';
import { QueryStateNoResult } from './QueryStateNoResult';
import { Card, Render, type RenderProps } from '@minvws/mgo-mgo-ui';

export type QueryStateProps<TData = unknown, TError = DefaultQueryError> = Pick<
    UseQueryResult<TData, TError>,
    'data' | 'error' | 'status' | 'fetchStatus'
> & {
    useCardWrapper?: boolean;
    useFetchStatus?: boolean;
    renderLoading?: ReactNode;
    renderNoResult?: ReactNode;
    renderError?: RenderProps<{ error: TError | null }>['children'];
    renderResult: RenderProps<{ data: NonNullable<TData> }>['children'];
};

const isEmpty = (data: unknown) =>
    data === null || data === undefined || (Array.isArray(data) && data.length === 0);

export function QueryState<TData = unknown, TError = DefaultQueryError>({
    error,
    data,
    status,
    fetchStatus,
    useCardWrapper = false,
    useFetchStatus = false,
    renderResult,
    renderNoResult = <QueryStateNoResult />,
    renderLoading = <QueryStateLoading />,
    renderError = <QueryStateError />,
}: QueryStateProps<TData, TError>) {
    const Wrapper = useCardWrapper ? Card : Fragment;

    switch (status) {
        case 'pending':
            if (useFetchStatus && fetchStatus !== 'fetching') {
                return null;
            }
            return <Wrapper>{renderLoading}</Wrapper>;
        case 'error':
            return (
                <Wrapper>
                    <Render error={error}>{renderError}</Render>
                </Wrapper>
            );
        case 'success':
            if (isEmpty(data)) {
                return <Wrapper>{renderNoResult}</Wrapper>;
            }

            return <Render data={data!}>{renderResult}</Render>;
        default:
            throw new Error(`Unhandled status: ${status}`);
    }
}

QueryState.Error = QueryStateError;
QueryState.Loading = QueryStateLoading;
QueryState.NoResult = QueryStateNoResult;
