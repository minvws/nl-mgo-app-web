import { authState, setAuthStateAuthenticated } from '$test/auth';
import { setupApp } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useOnboardingSeen } from './hooks';
import { type To } from './routing/routes';

test('redirect from root to welkom if onboarding not seen', () => {
    setupApp({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('waits for auth to load if there is a search query', async () => {
    const initialEntries: To[] = [
        {
            pathname: '/',
            search: '?code=123',
        },
    ];

    authState.isLoading = true;
    setupApp({ initialEntries });

    expect(screen.queryByRole('heading')).toBeNull();

    authState.isLoading = false;
    setupApp({ initialEntries });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect from root to login from root if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setupApp({ initialEntries: ['/'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('no redirect from root even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setupApp({ initialEntries: ['/welkom'] });

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );
});

test('redirect from login to overview if authenticated', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    setupApp({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading', { name: 'Voeg een zorgverlener toe' })).toBeVisible();
});

test('redirect to login from protected route', () => {
    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});
