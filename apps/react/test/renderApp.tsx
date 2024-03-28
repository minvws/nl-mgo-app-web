import { App, AppProviders } from '$/App';
import { routes, type To } from '$/routing/routes';
import { type Override } from '$/types/Override';
import { render } from '@testing-library/react';
import { isValidElement, type ReactNode } from 'react';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router-dom';

type MemoryOptions = Parameters<typeof createMemoryRouter>[1];

type TypedMemoryRouterOptions = Override<
    MemoryOptions,
    {
        initialEntries: To[];
    }
>;

export const renderApp = (options: TypedMemoryRouterOptions) =>
    render(<App router={createMemoryRouter(routes, options)} />);

export const renderWithAppProviders = (
    rootCompOrRoutes: ReactNode | RouteObject[],
    options?: MemoryOptions
) => {
    const routes = isValidElement(rootCompOrRoutes)
        ? [{ element: rootCompOrRoutes, path: '/' }]
        : rootCompOrRoutes;

    const router = createMemoryRouter(routes as RouteObject[], options);

    return render(
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    );
};
