import { removeUserMock, setAuthStateAuthenticated } from '$test/auth';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';
import { useOnboardingSeen } from '$/hooks';

test('overview', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText('Goedemorgen, Wendy')).toBeInTheDocument();
});

test('can logout', () => {
    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
