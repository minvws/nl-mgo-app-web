import { test, expect, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { authState, resetAuthState, signinRedirectMock, removeUserMock } from '../test/auth';
import App from './App';

afterEach(() => {
    resetAuthState();
});

test('login screen', async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /inloggen met digid/i }));

    expect(signinRedirectMock).toHaveBeenCalled();
});

test('loading screen', () => {
    authState.isLoading = true;

    render(<App />);

    expect(screen.getByText('Bezig met laden...')).toBeInTheDocument();
});

test('logging in screen', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signinSilent';

    render(<App />);

    expect(screen.getByText('Bezig met inloggen...')).toBeInTheDocument();
});

test('logging out screen', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signoutRedirect';

    render(<App />);

    expect(screen.getByText('Bezig met uitloggen...')).toBeInTheDocument();
});

test('error screen', () => {
    authState.error = new Error('Something went wrong');

    render(<App />);

    expect(screen.getByText('Er is een fout opgetreden')).toBeInTheDocument();
});

test('welcome screen', async () => {
    authState.isAuthenticated = true;
    // @ts-expect-error Doesn't satify the oidc-client-ts `User` class type, but is good enough for the test.
    authState.user = {
        access_token: 'access_token',
        token_type: 'Bearer',
        profile: {
            iss: 'http://localhost:5000',
            sub: 'unique_user_id',
            aud: ['client_id'],
            iat: Math.floor(Date.now()),
            exp: Math.floor(Date.now()) + 900,
        },
        state: 'some_unique_state_string',
    };

    render(<App />);

    expect(screen.getByText('Succesvol ingelogd met DigiD')).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
