import { AuthProvider } from '@/lib/auth';
import { readConfig } from '@/lib/config';
import { resetAuthState, signinRedirectMock, authState } from '@test/auth';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { Login } from './Login';

afterEach(() => {
    resetAuthState();
});

const renderWithAuthProvider = () => {
    render(
        <AuthProvider {...readConfig().oidc}>
            <Login />
        </AuthProvider>
    );
};

test('login', () => {
    renderWithAuthProvider();

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');

    fireEvent.click(screen.getByRole('button', { name: 'Inloggen met DigiD' }));

    expect(signinRedirectMock).toHaveBeenCalled();
});

test('auth loading', () => {
    authState.isLoading = true;

    renderWithAuthProvider();

    expect(screen.getByText('Bezig met laden...')).toBeInTheDocument();
});

test('auth logging in', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signinSilent';

    renderWithAuthProvider();

    expect(screen.getByText('Bezig met inloggen...')).toBeInTheDocument();
});

test('auth logging out', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signoutRedirect';

    renderWithAuthProvider();

    expect(screen.getByText('Bezig met uitloggen...')).toBeInTheDocument();
});

test('auth error', () => {
    authState.error = new Error('Something went wrong');

    renderWithAuthProvider();

    expect(screen.getByText('Er is een fout opgetreden')).toBeInTheDocument();
});
