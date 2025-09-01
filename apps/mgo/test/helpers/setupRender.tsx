import { App } from '$/App';
import { VadAuthProvider } from '$/auth';
import { IntlProvider } from '$/intl';
import { routes, type To } from '$/routing/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { type OverrideProperties } from 'type-fest';
import { vi } from 'vitest';

type MemoryOptions = Parameters<typeof createMemoryRouter>[1];

type TypedMemoryRouterOptions = OverrideProperties<
    NonNullable<MemoryOptions>,
    {
        initialEntries: To[];
    }
>;

type TestSetupResult = RenderResult & { user: ReturnType<typeof userEvent.setup> };

// eslint-disable-next-line react-refresh/only-export-components
export function setup(ui: ReactNode, options?: Omit<RenderOptions, 'queries'>): TestSetupResult {
    return { user: userEvent.setup(), ...render(ui, options) };
}

// eslint-disable-next-line react-refresh/only-export-components
export const setupApp = (options: TypedMemoryRouterOptions): TestSetupResult =>
    setup(<App router={createMemoryRouter(routes, options)} />);

interface TestAppProvidersProps {
    readonly children: ReactNode;
    readonly queryClient?: QueryClient;
}

export const TestAppProviders = ({ children, queryClient }: TestAppProvidersProps) => {
    const client =
        queryClient ??
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

    return (
        <QueryClientProvider client={client}>
            <IntlProvider>
                <HelmetProvider>
                    <VadAuthProvider navigate={vi.fn()}>
                        <StaticRouter location="/">{children}</StaticRouter>
                    </VadAuthProvider>
                </HelmetProvider>
            </IntlProvider>
        </QueryClientProvider>
    );
};

export const setupWithAppProviders = (element: ReactNode): TestSetupResult => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const { rerender, ...rest } = setup(
        <TestAppProviders queryClient={queryClient}>{element}</TestAppProviders>
    );

    return {
        ...rest,
        rerender: (element: ReactNode) => {
            rerender(<TestAppProviders queryClient={queryClient}>{element}</TestAppProviders>);
        },
    };
};
