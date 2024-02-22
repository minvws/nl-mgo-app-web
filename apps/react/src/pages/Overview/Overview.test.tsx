import { AuthProvider } from '@/lib/auth';
import { readConfig } from '@/lib/config';
import { authState, removeUserMock, setAuthStateAuthenticated } from '@test/auth';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

const renderWithAuthProvider = () => {
    render(
        <AuthProvider {...readConfig().oidc}>
            <Overview />
        </AuthProvider>
    );
};

test('overview', () => {
    setAuthStateAuthenticated();
    renderWithAuthProvider();

    expect(screen.getByText('Succesvol ingelogd met DigiD')).toBeInTheDocument();
});

test('can logout', () => {
    authState.isAuthenticated = true;
    renderWithAuthProvider();

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
