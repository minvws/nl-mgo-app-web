import { removeUserMock, setAuthStateAuthenticated } from '$test/auth';
import { renderWithAppProviders } from '$test/renderApp';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

test('overview', () => {
    setAuthStateAuthenticated();
    renderWithAppProviders(<Overview />);

    expect(screen.getByText('Goedemorgen, Wendy')).toBeInTheDocument();
});

test('can logout', () => {
    setAuthStateAuthenticated();
    renderWithAppProviders(<Overview />);

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
