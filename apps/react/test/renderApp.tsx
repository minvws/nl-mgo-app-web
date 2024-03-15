import { App, AppProviders } from '$/App';
import { type RoutePath, routes } from '$/routing/routes';
import { type Override } from '$/types/Override';
import { render } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter, createMemoryRouter, type MemoryRouterProps } from 'react-router-dom';

type TypedMemoryRouterProps = Override<
    MemoryRouterProps,
    {
        initialEntries: RoutePath[];
    }
>;

export const renderApp = (options: TypedMemoryRouterProps) =>
    render(<App router={createMemoryRouter(routes, options)} />);

export const renderWithAppProviders = (component: ReactNode) =>
    render(
        <AppProviders>
            <MemoryRouter>{component}</MemoryRouter>
        </AppProviders>
    );
