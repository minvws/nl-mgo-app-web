import { App, AppProviders } from '$/App';
import { routes, type To } from '$/routing/routes';
import { type Override } from '$/types/Override';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isValidElement, type ReactNode } from 'react';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router-dom';

type MemoryOptions = Parameters<typeof createMemoryRouter>[1];

type TypedMemoryRouterOptions = Override<
    MemoryOptions,
    {
        initialEntries: To[];
    }
>;

export function setup(ui: ReactNode, options?: Omit<RenderOptions, 'queries'>) {
    return { user: userEvent.setup(), ...render(ui, options) };
}

export const setupApp = (options: TypedMemoryRouterOptions) =>
    setup(<App router={createMemoryRouter(routes, options)} />);

export const setupWithAppProviders = (
    rootCompOrRoutes: ReactNode | RouteObject[],
    options?: MemoryOptions
) => {
    const routes = isValidElement(rootCompOrRoutes)
        ? [{ element: rootCompOrRoutes, path: '/' }]
        : rootCompOrRoutes;

    const router = createMemoryRouter(routes as RouteObject[], options);

    return setup(
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    );
};
