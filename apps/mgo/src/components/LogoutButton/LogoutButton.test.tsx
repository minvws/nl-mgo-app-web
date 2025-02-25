import { removeUserMock, setAuthStateAuthenticated, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { LogoutButton } from './LogoutButton';

test('can logout', async () => {
    setAuthStateAuthenticated();
    const { user } = setupWithAppProviders(<LogoutButton />);
    const button = screen.getByRole('button', { name: appMessage('common.logout') });
    await user.click(button);
    expect(removeUserMock).toHaveBeenCalled();
});
