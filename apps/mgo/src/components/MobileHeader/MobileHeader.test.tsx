import { Outlet } from '$/routing';
import {
    setup,
    setupWithAppProviders,
    flushCallStack,
    removeUserMock,
    setAuthStateAuthenticated,
    message,
} from '$test/helpers';
import { useNavFocusRef } from '$/hooks';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MobileHeader } from './MobileHeader';
import { createMemoryRouter } from 'react-router-dom';
import { App } from '$/App';
import { messageRegexp } from '$test/helpers/i18n';

test('render MobileHeader', () => {
    setupWithAppProviders(<MobileHeader />);
    expect(screen.getAllByRole('button').at(0)).toHaveTextContent(message('menu.menu'));
});

test('can logout', () => {
    setAuthStateAuthenticated();
    setupWithAppProviders(<MobileHeader />);

    fireEvent.click(screen.getByRole('button', { name: message('common.logout') }));

    expect(removeUserMock).toHaveBeenCalled();
});

test('menu button opens menu dialog', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<MobileHeader />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const menuButton = screen.getByRole('button', {
        name: message('menu.menu'),
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('close button closes menu dialog', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', {
        name: message('menu.menu'),
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: message('common.voice_over_close') });

    expect(closeButton).toHaveFocus();

    await user.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
});

test('navigating closes menu dialog', async () => {
    const user = userEvent.setup();
    const Page = () => {
        const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
        return <h1 ref={navFocusRef}>Test page</h1>;
    };
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
                    element: <Page />,
                },
            ],
        },
    ];

    const router = createMemoryRouter(routes);
    setup(<App router={router} />);

    const menuButton = screen.getByRole('button', { name: message('menu.menu') });
    await user.click(menuButton);

    const overzichtLink = screen.getByRole('link', {
        name: messageRegexp('menu.overview_heading'),
    });
    await user.click(overzichtLink);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await flushCallStack();
    const heading = screen.getByRole('heading', {
        level: 1,
        name: 'Test page',
    });
    expect(heading).toHaveFocus();
});
