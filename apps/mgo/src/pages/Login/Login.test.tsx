import { useAuth } from '$/auth';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { Login } from './Login';

vi.mock('$/auth');

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

test('login', async () => {
    const login = vi.fn();
    mockUseAuth.mockImplementation(() => faker.custom.authState({ login }));

    const { user } = setupWithAppProviders(<Login />);

    expect(screen.getByRole('heading')).toHaveTextContent(appMessage('login.heading'));

    await user.click(screen.getByRole('button', { name: appMessage('login.digid') }));

    expect(login).toHaveBeenCalled();
});

test('auth loading', () => {
    mockUseAuth.mockReturnValue(faker.custom.authState({ isLoading: true }));

    setupWithAppProviders(<Login />);

    screen.getByRole('button', { name: appMessage('common.loading') });
});

test('auth error', () => {
    mockUseAuth.mockReturnValue({ ...faker.custom.authState(), loadingError: new Error() });

    setupWithAppProviders(<Login />);

    expect(screen.getByText(appMessage('login.error_heading'))).toBeInTheDocument();
});
