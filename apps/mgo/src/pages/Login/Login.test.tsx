import { useAuth, type AuthState } from '$/auth';
import { LOGIN_CALLBACK_FLAG } from '$/auth/VadAuthProvider/VadAuthProvider';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { flushCallStack } from '@minvws/mgo-utils';
import { screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { Login } from './Login';

vi.mock('$/auth');

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

afterEach(() => {
    vi.resetAllMocks();
});

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

test.each<keyof Pick<AuthState, 'loadingError' | 'parsingError'>>(['loadingError', 'parsingError'])(
    'shows authentication error: %s',
    async (errorKey) => {
        mockUseAuth.mockReturnValue({ ...faker.custom.authState(), [errorKey]: new Error() });

        const { user } = setupWithAppProviders(<Login />);

        await flushCallStack();

        let dialog: HTMLElement | null = screen.getByRole('alertdialog', {
            name: appMessage('login.error_heading'),
        });
        const confirmButton = within(dialog).getByRole('button', {
            name: appMessage('common.ok'),
        });

        expect(dialog).toBeVisible();
        await user.click(confirmButton);

        dialog = await screen.queryByRole('alertdialog', {
            name: appMessage('login.error_heading'),
        });

        expect(dialog).not.toBeInTheDocument();
    }
);

test('updates userinfo when LOGIN_CALLBACK_FLAG is present', async () => {
    const auth = faker.custom.authState();
    mockUseAuth.mockReturnValue(auth);

    vi.spyOn(window, 'location', 'get').mockReturnValue({
        search: `?${LOGIN_CALLBACK_FLAG}`,
    } as Location);

    setupWithAppProviders(<Login />);
    expect(auth.updateUserInfoFromUrl).toHaveBeenCalled();
});

test('does NOT update userinfo when LOGIN_CALLBACK_FLAG is NOT present', async () => {
    const auth = faker.custom.authState();
    mockUseAuth.mockReturnValue(auth);

    setupWithAppProviders(<Login />);
    expect(auth.updateUserInfoFromUrl).not.toHaveBeenCalled();
});
