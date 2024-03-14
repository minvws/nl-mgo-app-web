import { setAuthStateAuthenticated } from '$test/auth';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { expect, test } from 'vitest';
import { App } from './App';
import { routes } from './routes';
import { useOnboardingSeen } from './hooks';

const renderWithRouter = (options?: MemoryRouterProps) =>
    render(<App router={createMemoryRouter(routes, options)} />);

test('redirect to onboarding from login', () => {
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to onboarding from protected route', () => {
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to login from protected route', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('redirect to login from root if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderWithRouter({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from login if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from onboarding even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderWithRouter({ initialEntries: ['/welkom'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('no redirect from terms even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderWithRouter({ initialEntries: ['/hoe-werkt-het'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});

test('redirect from login to overview if authenticated', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading', { name: 'Mijn Gezondheidsoverzicht' })).toBeVisible();
});

test('redirect from login to onboarding if authenticated but not onboarding seen (edge case)', () => {
    setAuthStateAuthenticated();
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});
