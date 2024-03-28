import { Outlet } from '$/routing';
import { renderWithAppProviders } from '$test/renderApp';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MobileHeader } from './MobileHeader';

test('render MobileHeader', () => {
    renderWithAppProviders(<MobileHeader />);
    expect(screen.getAllByRole('button').at(0)).toHaveTextContent('Menu');
});

test('check if menu dialog opens', async () => {
    const user = userEvent.setup();
    renderWithAppProviders(<MobileHeader />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const menuButton = screen.getByRole('button', {
        name: 'Menu',
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('check if menu dialog closes on close', async () => {
    const user = userEvent.setup();
    renderWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', {
        name: 'Menu',
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    const closeButton = within(screen.getByRole('dialog')).getByRole('button');
    await user.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('check if menu dialog closes on navigation', async () => {
    const user = userEvent.setup();
    renderWithAppProviders([
        {
            path: '/',
            element: (
                <div>
                    <MobileHeader />
                    <Outlet />
                </div>
            ),
            children: [
                {
                    path: '/overzicht',
                    element: <h1>Overzicht</h1>,
                },
            ],
        },
    ]);

    const menuButton = screen.getByRole('button', {
        name: 'Menu',
    });
    await user.click(menuButton);

    const overzichtLink = within(screen.getByRole('dialog')).getByRole('link', {
        name: /Overzicht/,
    });

    await user.click(overzichtLink);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Overzicht');
});
