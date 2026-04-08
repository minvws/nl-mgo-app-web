import { useRootRedirect } from '$/hooks';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { DesktopHeader } from './DesktopHeader';

vi.mock('$/hooks');
const mockUseRootRedirect = useRootRedirect as MockedFunction<typeof useRootRedirect>;

beforeEach(() => {
    mockUseRootRedirect.mockReturnValue({
        to: '/inloggen',
        label: 'common.mgo_header_login_link',
        ribbonLabel: 'common.rijkslint_login_link',
    });
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
    mockUseRootRedirect.mockReturnValue({
        to: '/overzicht',
        label: 'common.mgo_header_link',
        ribbonLabel: 'common.rijkslint_link',
    });
    setupWithAppProviders(<DesktopHeader />);

    expect(screen.getByRole('link', { name: appMessage('common.mgo_header_link') })).toBeVisible();
});

test('logo link has login aria-label when user is not authenticated', () => {
    mockUseRootRedirect.mockReturnValue({
        to: '/inloggen',
        label: 'common.mgo_header_login_link',
        ribbonLabel: 'common.rijkslint_login_link',
    });
    setupWithAppProviders(<DesktopHeader />);

    expect(
        screen.getByRole('link', { name: appMessage('common.mgo_header_login_link') })
    ).toBeVisible();
});
