import { authState, signinRedirectMock, setupWithAppProviders, message } from '$test/helpers';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Login } from './Login';

test('login', () => {
    setupWithAppProviders(<Login />);

    expect(screen.getByRole('heading')).toHaveTextContent(message('login.heading'));

    fireEvent.click(screen.getByRole('button', { name: message('login.digid') }));

    expect(signinRedirectMock).toHaveBeenCalled();
});

test('auth loading', () => {
    authState.isLoading = true;

    setupWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met laden...')).toBeInTheDocument();
});

test('auth logging in', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signinSilent';

    setupWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met inloggen...')).toBeInTheDocument();
});

test('auth logging out', () => {
    authState.isLoading = true;
    authState.activeNavigator = 'signoutRedirect';

    setupWithAppProviders(<Login />);

    expect(screen.getByText('Bezig met uitloggen...')).toBeInTheDocument();
});

test('auth error', () => {
    authState.error = new Error('Something went wrong');

    setupWithAppProviders(<Login />);

    expect(screen.getByText(message('login.error_heading'))).toBeInTheDocument();
});
