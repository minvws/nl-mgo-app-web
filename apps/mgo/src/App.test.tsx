import { authState, setAuthStateAuthenticated, setupApp } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useOnboardingSeen } from './hooks';
import { type To } from './routing/routes';

test('redirect from root to welkom if onboarding not seen', () => {
    setupApp({ initialEntries: ['/'] });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('introduction.heading'));
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

    expect(
        screen.queryByRole('heading', {
            level: 1,
        })
    ).toBeNull();

    authState.isLoading = false;
    setupApp({ initialEntries });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('introduction.heading'));
});

test('redirect from root to login from root if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setupApp({ initialEntries: ['/'] });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('login.heading'));
});

test('no redirect from root even if onboarding seen', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setupApp({ initialEntries: ['/welkom'] });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('introduction.heading'));
});

test('redirect from login to add organization if authenticated', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    setupApp({ initialEntries: ['/inloggen'] });

    expect(
        screen.getByRole('heading', { name: appMessage('add_organization.heading') })
    ).toBeVisible();
});

test('redirect to login from protected route', () => {
    setupApp({ initialEntries: ['/overzicht'] });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('login.heading'));
});

test('redirect to login with errors if authentication failed', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setupApp({ initialEntries: ['/?error=test&error_description=test'] });

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent('Bewijs wie je bent');
});
