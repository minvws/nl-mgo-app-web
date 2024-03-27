import { setAuthStateAuthenticated } from '$test/auth';
import { renderApp } from '$test/renderApp';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useOnboardingSeen } from './hooks';

test('redirect from root to welkom if onboarding not seen', () => {
    renderApp({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect from root to login from root if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from root even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/welkom'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect from login to overview if authenticated', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    renderApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading', { name: 'Mijn Gezondheidsoverzicht' })).toBeVisible();
});

test('redirect to login from protected route', () => {
    renderApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});
