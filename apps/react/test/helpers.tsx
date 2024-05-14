import { App } from '$/App';
import { routes, type To } from '$/routing/routes';
import { type Override } from '$/types/Override';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { createMemoryRouter } from 'react-router-dom';

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

export const setupWithAppProviders = (element: ReactNode) => {
    const router = createMemoryRouter([{ element, path: '/' }]);
    const { rerender, ...rest } = setup(<App router={router} />);

    return {
        ...rest,
        rerender: (ui: ReactNode) => {
            const router = createMemoryRouter([{ element: ui, path: '/' }]);
            rerender(<App router={router} />);
        },
    };
};
