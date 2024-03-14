import { authState, signinRedirectMock } from '$test/auth';
import { renderWithAppProviders } from '$test/renderApp';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Login } from './Login';

test('login', () => {
    renderWithAppProviders(<Login />);

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');

    fireEvent.click(screen.getByRole('button', { name: 'Inloggen met DigiD' }));

    expect(signinRedirectMock).toHaveBeenCalled();
});

test('auth loading', () => {
    authState.isLoading = true;

    renderWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met laden...')).toBeInTheDocument();
});

test('auth logging in', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signinSilent';

    renderWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met inloggen...')).toBeInTheDocument();
});

test('auth logging out', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signoutRedirect';

    renderWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met uitloggen...')).toBeInTheDocument();
});

test('auth error', () => {
    authState.error = new Error('Something went wrong');

    renderWithAppProviders(<Login />);

    expect(screen.getByText('Er is een fout opgetreden')).toBeInTheDocument();
});
