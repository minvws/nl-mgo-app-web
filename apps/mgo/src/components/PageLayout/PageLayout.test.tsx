import { mockMatchMedia, setupWithAppProviders } from '$test/helpers';
import { breakpointQueries } from '@minvws/mgo-mgo-ui';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { PageLayout } from './PageLayout';

vi.mock('react-router-dom', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...mod,
        Outlet: () => <div data-testid="outlet" />,
        ScrollRestoration: () => <div data-testid="scroll-restoration" />,
    };
});

test('renders with mobile header as default', async () => {
    setupWithAppProviders(<PageLayout />);
    screen.getByTestId('header-mobile');
    screen.getByTestId('outlet');
});

test('renders with desktop header from breakpoint sm', async () => {
    mockMatchMedia([breakpointQueries.sm]);
    setupWithAppProviders(<PageLayout />);
    screen.getByTestId('header-desktop');
    screen.getByTestId('outlet');
});

test('renders with desktop-menu on desktop', async () => {
    mockMatchMedia([breakpointQueries.sm]);
    setupWithAppProviders(<PageLayout />);
    screen.getByTestId('menu-desktop');
});

test('renders without desktop-menu on desktop if hidden', async () => {
    mockMatchMedia([breakpointQueries.sm]);
    setupWithAppProviders(<PageLayout hideMenu />);
    const menu = screen.queryByTestId('menu-desktop');
    expect(menu).not.toBeInTheDocument();
});

test('renders without desktop-menu on mobile', async () => {
    setupWithAppProviders(<PageLayout />);
    const menu = screen.queryByTestId('menu-desktop');
    expect(menu).not.toBeInTheDocument();
});
