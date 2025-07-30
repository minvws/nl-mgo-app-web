import { setup, setupWithAppProviders } from '$test/helpers';
import { supressConsoleError } from '$test/helpers/supressConsoleError';
import { faker } from '@faker-js/faker';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { QueryState, type QueryStateProps } from './QueryState';

test('Default loading state is shown when status is pending', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'pending',
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.queryByTestId('result')).toBeNull();
});

test('Can be wrapped with a Card component', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'pending',
        renderResult: <span data-testid="result" />,
        useCardWrapper: true,
    };

    setupWithAppProviders(<QueryState {...query} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.queryByTestId('result')).toBeNull();
});

test('Custom loading state is shown', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'pending',
        renderLoading: <span data-testid="custom-loading" />,
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);

    screen.getByTestId('custom-loading');
    expect(screen.queryByTestId('result')).toBeNull();
});

test('Loading state can be set to use the fetchStatus', async () => {
    const query: QueryStateProps = {
        useFetchStatus: true,
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'pending',
        renderResult: <span data-testid="result" />,
    };
    const { rerender } = setupWithAppProviders(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();

    rerender(<QueryState {...{ ...query, useFetchStatus: false }} fetchStatus="fetching" />);

    expect(screen.getByRole('progressbar')).toBeVisible();
});

test.each([undefined, null, []])(
    'Default NoResult is shown when data is considered empty: %j',
    (data) => {
        const query: QueryStateProps = {
            fetchStatus: 'idle',
            data,
            error: null,
            status: 'success',
            renderResult: <span data-testid="result" />,
        };

        setupWithAppProviders(<QueryState {...query} />);

        expect(screen.queryByRole('progressbar')).toBeNull();
        expect(screen.queryByTestId('result')).toBeNull();

        screen.getByRole('heading', {
            name: appMessage('common.no_results_heading'),
        });
    }
);

test.each([undefined, null, []])(
    'Custom NoResult is shown when data is considered empty: %j',
    (data) => {
        const query: QueryStateProps = {
            fetchStatus: 'idle',
            data,
            error: null,
            status: 'success',
            renderNoResult: <span data-testid="custom-no-result" />,
            renderResult: <span data-testid="result" />,
        };

        setupWithAppProviders(<QueryState {...query} />);

        expect(screen.queryByTestId('result')).toBeNull();

        screen.getByTestId('custom-no-result');
    }
);

test('Result is shown', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: {},
        error: null,
        status: 'success',
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    screen.getByTestId('result');
});

test('Result is shown and is passed the data', () => {
    const query: QueryStateProps<{ foo: string }> = {
        fetchStatus: 'idle',
        data: { foo: faker.lorem.word() },
        error: null,
        status: 'success',
        renderResult: ({ data }) => <span data-testid="result">{data.foo}</span>,
    };

    setupWithAppProviders(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.getByTestId('result').textContent).toBe(query.data!.foo);
});

test('Default error is shown', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'error',
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();

    screen.getByRole('heading', {
        name: appMessage('common.error_heading'),
    });
});

test('Custom error is shown', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: { name: faker.lorem.word(), message: faker.lorem.sentence() },
        status: 'error',
        renderError: <span data-testid="custom-error" />,
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);
    screen.getByTestId('custom-error');
});

test('Custom error is shown and is passed the error object', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: { name: faker.lorem.word(), message: faker.lorem.sentence() },
        status: 'error',
        renderError: ({ error }) => <span data-testid="custom-error">{error?.name}</span>,
        renderResult: <span data-testid="result" />,
    };

    setupWithAppProviders(<QueryState {...query} />);
    expect(screen.getByTestId('custom-error').textContent).toBe(query.error!.name);
});

test('QueryState throws if it receives an invalid status', () => {
    const query: QueryStateProps = {
        fetchStatus: 'idle',
        data: undefined,
        error: null,
        status: 'invalid' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        renderResult: <span data-testid="result" />,
    };

    supressConsoleError(() => {
        expect(() => setup(<QueryState {...query} />)).toThrow(`Unhandled status: ${query.status}`);
    });
});
