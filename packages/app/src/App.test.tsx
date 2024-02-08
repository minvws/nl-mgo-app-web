import { test, expect, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import {
    authState,
    resetAuthState,
    signinRedirectMock,
    removeUserMock,
    setAuthStateAuthenticated,
} from '../test/auth';
import { App } from './App';
import { routes } from './routes';
import { getIntroSeen, setIntroSeen } from './lib/introSeen';

afterEach(() => {
    resetAuthState();
    setIntroSeen(false);
});

const renderWithRouter = (options?: Parameters<typeof createMemoryRouter>[1]) =>
    render(<App router={createMemoryRouter(routes, options)} />);

const introHeadingOne = 'Jouw gezond\u00ADheids\u00ADgegevens op één plek verzameld';
const introHeadingTwo = 'Zo gebruikt de app jouw gegevens';

test('intro', () => {
    renderWithRouter();

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingOne);

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingTwo);

    fireEvent.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(getIntroSeen()).toBe(true);
});

test('redirect to intro from login', () => {
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingOne);
});

test('redirect to intro from protected route', () => {
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingOne);
});

test('login', () => {
    setIntroSeen(true);
    renderWithRouter();

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');

    fireEvent.click(screen.getByRole('button', { name: 'Inloggen met DigiD' }));

    expect(signinRedirectMock).toHaveBeenCalled();
});

test('redirect to login from protected route', () => {
    setIntroSeen(true);
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});

test('auth loading', () => {
    setIntroSeen(true);
    authState.isLoading = true;
    renderWithRouter({
        initialEntries: ['/', '/inloggen'],
        initialIndex: 1,
    });

    expect(screen.getByText('Bezig met laden...')).toBeInTheDocument();
});

test('auth logging in', () => {
    setIntroSeen(true);
    authState.isLoading = true;
    authState.activeNavigator = 'signinSilent';
    renderWithRouter({
        initialEntries: ['/', '/inloggen'],
        initialIndex: 1,
    });

    expect(screen.getByText('Bezig met inloggen...')).toBeInTheDocument();
});

test('auth logging out', () => {
    setIntroSeen(true);
    authState.isLoading = true;
    authState.activeNavigator = 'signoutRedirect';
    renderWithRouter({
        initialEntries: ['/', '/inloggen'],
        initialIndex: 1,
    });

    expect(screen.getByText('Bezig met uitloggen...')).toBeInTheDocument();
});

test('auth error', () => {
    setIntroSeen(true);
    authState.error = new Error('Something went wrong');
    renderWithRouter({
        initialEntries: ['/', '/inloggen'],
        initialIndex: 1,
    });

    expect(screen.getByText('Er is een fout opgetreden')).toBeInTheDocument();
});

test('overzicht', () => {
    setIntroSeen(true);
    setAuthStateAuthenticated();
    renderWithRouter();

    expect(screen.getByText('Succesvol ingelogd met DigiD')).toBeInTheDocument();
});

test('logout', () => {
    setIntroSeen(true);
    authState.isAuthenticated = true;
    renderWithRouter();

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
});
