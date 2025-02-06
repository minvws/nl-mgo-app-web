import {
    message,
    removeUserMock,
    setAuthStateAuthenticated,
    setupWithAppProviders,
} from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { LogoutButton } from './LogoutButton';

test('can logout', async () => {
    setAuthStateAuthenticated();
    const { user } = setupWithAppProviders(<LogoutButton />);
    const button = screen.getByRole('button', { name: message('common.logout') });
    await user.click(button);
    expect(removeUserMock).toHaveBeenCalled();
});
