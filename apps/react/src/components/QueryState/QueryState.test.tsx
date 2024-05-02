import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { QueryState, type QueryStateProps } from './QueryState';
import { faker } from '@faker-js/faker';
import { supressError } from '$test/supressError';

test('Default pending state is shown', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: null,
        status: 'pending',
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.queryByTestId('result')).toBeNull();
});

test('Custom pending state is shown', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: null,
        status: 'pending',
        renderPending: <span data-testid="custom-pending" />,
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);

    screen.getByTestId('custom-pending');
    expect(screen.queryByTestId('result')).toBeNull();
});

test.each([undefined, null, []])(
    'Default NoResult is shown when data is considered empty: %j',
    (data) => {
        const query: QueryStateProps = {
            data,
            error: null,
            status: 'success',
            renderResult: <span data-testid="result" />,
        };

        render(<QueryState {...query} />);

        expect(screen.queryByRole('progressbar')).toBeNull();
        expect(screen.queryByTestId('result')).toBeNull();

        screen.getByText('Geen resultaat gevonden');
    }
);

test.each([undefined, null, []])(
    'Custom NoResult is shown when data is considered empty: %j',
    (data) => {
        const query: QueryStateProps = {
            data,
            error: null,
            status: 'success',
            renderNoResult: <span data-testid="custom-no-result" />,
            renderResult: <span data-testid="result" />,
        };

        render(<QueryState {...query} />);

        expect(screen.queryByTestId('result')).toBeNull();

        screen.getByTestId('custom-no-result');
    }
);

test('Result is shown', () => {
    const query: QueryStateProps = {
        data: {},
        error: null,
        status: 'success',
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    screen.getByTestId('result');
});

test('Result is shown and is passed the data', () => {
    const query: QueryStateProps<{ foo: string }> = {
        data: { foo: faker.lorem.word() },
        error: null,
        status: 'success',
        renderResult: ({ data }) => <span data-testid="result">{data.foo}</span>,
    };

    render(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.getByTestId('result').textContent).toBe(query.data!.foo);
});

test('Default error is shown', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: null,
        status: 'error',
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    screen.getByText('Er ging iets mis');
});

test('Custom error is shown', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: { name: faker.lorem.word(), message: faker.lorem.sentence() },
        status: 'error',
        renderError: <span data-testid="custom-error" />,
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);
    screen.getByTestId('custom-error');
});

test('Custom error is shown and is passed the error object', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: { name: faker.lorem.word(), message: faker.lorem.sentence() },
        status: 'error',
        renderError: ({ error }) => <span data-testid="custom-error">{error?.name}</span>,
        renderResult: <span data-testid="result" />,
    };

    render(<QueryState {...query} />);
    expect(screen.getByTestId('custom-error').textContent).toBe(query.error!.name);
});

test('QueryState throws if it receives an invalid status', () => {
    const query: QueryStateProps = {
        data: undefined,
        error: null,
        status: 'invalid' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        renderResult: <span data-testid="result" />,
    };

    supressError(() => {
        expect(() => render(<QueryState {...query} />)).toThrow(
            `Unhandled status: ${query.status}`
        );
    });
});
