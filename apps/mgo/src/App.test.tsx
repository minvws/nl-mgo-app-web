import { useAuth } from '$/auth';
import { faker } from '$test/faker';
import { setupApp } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { useOnboardingSeen } from './hooks';

vi.mock('$/auth');
const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

beforeEach(() => {
    mockUseAuth.mockRestore();
});

test('redirect from root to welkom if onboarding not seen', () => {
    setupApp({ initialEntries: ['/'] });

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
    mockUseAuth.mockImplementation(() => faker.custom.authState({ isAuthenticated: true }));
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
