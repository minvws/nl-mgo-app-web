import { removeUserMock, setAuthStateAuthenticated, setupWithAppProviders } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DesktopHeader } from './DesktopHeader';

test('can logout', () => {
    setAuthStateAuthenticated();
    setupWithAppProviders(<DesktopHeader />);

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
