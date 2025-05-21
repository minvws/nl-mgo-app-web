import { useAuth } from '$/auth';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { LogoutButton } from './LogoutButton';

vi.mock('$/auth');

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

test('can logout', async () => {
    const logout = vi.fn();
    mockUseAuth.mockImplementation(() => faker.custom.authState({ logout }));

    const { user } = setupWithAppProviders(<LogoutButton />);
    const button = screen.getByRole('button', { name: appMessage('common.logout') });
    await user.click(button);
    expect(logout).toHaveBeenCalled();
});
