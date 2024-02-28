import { setIntroSeen } from '$/lib/introSeen';
import { resetAuthState, setAuthStateAuthenticated } from '$test/auth';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';
import { App } from './App';
import { routes } from './routes';

afterEach(() => {
    resetAuthState();
    setIntroSeen(false);
});

const renderWithRouter = (options?: MemoryRouterProps) =>
    render(<App router={createMemoryRouter(routes, options)} />);

test('redirect to intro from login', () => {
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to intro from protected route', () => {
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to login from protected route', () => {
    setIntroSeen(true);
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from login if intro seen', () => {
    setIntroSeen(true);
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('redirect from login to overview if authenticated', () => {
    setIntroSeen(true);
    setAuthStateAuthenticated();
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Succesvol ingelogd met DigiD');
});

test('redirect from login to intro if authenticated but not intro seen (edge case)', () => {
    setAuthStateAuthenticated();
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});
