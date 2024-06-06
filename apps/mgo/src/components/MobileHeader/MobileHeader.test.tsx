import { Outlet } from '$/routing';
import { setup, setupWithAppProviders } from '$test/helpers';
import { useNavFocusRef } from '$/hooks';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MobileHeader } from './MobileHeader';
import { flushCallStack } from '$test/flushCallstack';
import { createMemoryRouter } from 'react-router-dom';
import { App } from '$/App';
import { removeUserMock, setAuthStateAuthenticated } from '$test/auth';

test('render MobileHeader', () => {
    setupWithAppProviders(<MobileHeader />);
    expect(screen.getAllByRole('button').at(0)).toHaveTextContent('Menu');
});

test('can logout', () => {
    setAuthStateAuthenticated();
    setupWithAppProviders(<MobileHeader />);

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});

test('menu button opens menu dialog', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<MobileHeader />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const menuButton = screen.getByRole('button', {
        name: 'Menu',
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('close button closes menu dialog', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<MobileHeader />);

    const menuButton = screen.getByRole('button', {
        name: 'Menu',
    });
    await user.click(menuButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Sluiten' });

    expect(closeButton).toHaveFocus();

    await user.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
});

test('navigating closes menu dialog', async () => {
    const user = userEvent.setup();
    const Page = () => {
        const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
        return <h1 ref={navFocusRef}>Overzicht</h1>;
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

    const menuButton = screen.getByRole('button', { name: 'Menu' });
    await user.click(menuButton);

    const overzichtLink = screen.getByRole('link', { name: /Overzicht/ });
    await user.click(overzichtLink);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await flushCallStack();
    const heading = screen.getByRole('heading', { level: 1, name: /Overzicht/ });
    expect(heading).toHaveFocus();
});
