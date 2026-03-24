import { useAuth } from '$/auth';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { DesktopHeader } from './DesktopHeader';

vi.mock('$/auth');
const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

beforeEach(() => {
    mockUseAuth.mockRestore();
});

test('renders the app name in the header', () => {
    setupWithAppProviders(<DesktopHeader />);

    expect(
        screen.getByRole('heading', {
            level: 2,
        })
    ).toHaveTextContent(appMessage('common.app_name'));
});

test('logo link has authenticated aria-label when user is logged in', () => {
    mockUseAuth.mockImplementation(() => faker.custom.authState({ isAuthenticated: true }));
    setupWithAppProviders(<DesktopHeader />);

    expect(screen.getByRole('link', { name: appMessage('common.mgo_header_link') })).toBeVisible();
});

test('logo link has login aria-label when user is not authenticated', () => {
    mockUseAuth.mockImplementation(() => faker.custom.authState({ isAuthenticated: false }));
    setupWithAppProviders(<DesktopHeader />);

    expect(
        screen.getByRole('link', { name: appMessage('common.mgo_header_login_link') })
    ).toBeVisible();
});
