import { App } from '$/App';
import { Outlet } from '$/routing';
import { setup, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { MobileHeader } from './MobileHeader';

test('menu button opens and closes menu', async () => {
    const { user } = setupWithAppProviders(<MobileHeader />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    const openMenuButton = screen.getByRole('button', { name: appMessage('menu.menu') });
    await user.click(openMenuButton);

    expect(screen.queryByRole('navigation')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: appMessage('common.voice_over_close') });
    await user.click(closeButton);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('clicking outside menu closes menu', async () => {
    const { user } = setupWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', { name: appMessage('menu.menu') });
    await user.click(menuButton);

    expect(screen.queryByRole('navigation')).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('navigating closes menu', async () => {
    const routes = [
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
                    element: <h1>Test</h1>,
                },
            ],
        },
    ];

    const { user } = setup(<App router={createMemoryRouter(routes)} />);

    const heading = screen.queryByRole('heading', { level: 1, name: 'Test' });
    expect(heading).not.toBeInTheDocument();

    const menuButton = screen.getByRole('button', { name: appMessage('menu.menu') });
    await user.click(menuButton);

    const overzichtLink = screen.getByRole('link', { name: appMessage('menu.overview_heading') });
    await user.click(overzichtLink);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    screen.getByRole('heading', { level: 1, name: 'Test' });
});

test('Escape closes menu and moves the focus back to the menu button', async () => {
    const { user } = setupWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', { name: appMessage('menu.menu') });

    await user.tab();
    expect(menuButton).toHaveFocus();
    await user.keyboard('[Space]');
    expect(screen.queryByRole('navigation')).toBeInTheDocument();

    await user.tab();
    expect(menuButton).not.toHaveFocus();

    await user.keyboard('[Escape]');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    expect(menuButton).toHaveFocus();
});

test('Escape does not change focus when menu is closed', async () => {
    const { user } = setupWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', { name: appMessage('menu.menu') });

    expect(menuButton).not.toHaveFocus();
    await user.keyboard('[Escape]');
    expect(menuButton).not.toHaveFocus();
});
