import { setAuthStateAuthenticated } from '$test/auth';
import { renderApp } from '$test/renderApp';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useOnboardingSeen } from './hooks';

test('redirect to onboarding from login', () => {
    renderApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to onboarding from protected route', () => {
    renderApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect to login from protected route', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('redirect to login from root if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from login if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from onboarding even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/welkom'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('no redirect from terms even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    renderApp({ initialEntries: ['/hoe-werkt-het'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});

test('redirect from login to overview if authenticated', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    renderApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading', { name: 'Mijn Gezondheidsoverzicht' })).toBeVisible();
});

test('redirect from login to onboarding if authenticated but not onboarding seen (edge case)', () => {
    setAuthStateAuthenticated();
    renderApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});
