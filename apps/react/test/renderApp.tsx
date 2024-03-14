import { App, AppProviders } from '$/App';
import { routes } from '$/routes';
import { render } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter, createMemoryRouter, type MemoryRouterProps } from 'react-router-dom';

export const renderApp = (options: MemoryRouterProps) =>
    render(<App router={createMemoryRouter(routes, options)} />);

export const renderWithAppProviders = (component: ReactNode) =>
    render(
        <AppProviders>
            <MemoryRouter>{component}</MemoryRouter>
        </AppProviders>
    );
