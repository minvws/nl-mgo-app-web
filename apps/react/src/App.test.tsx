import { render, screen } from '@testing-library/react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';
import { resetAuthState } from '$test/auth';
import { setIntroSeen } from '$/lib/introSeen';
import { App } from './App';

afterEach(() => {
    resetAuthState();
    setIntroSeen(false);
});

const renderWithRouter = (options?: MemoryRouterProps) =>
    render(
        <MemoryRouter {...options}>
            <App />
        </MemoryRouter>
    );

const introHeadingOne = 'Je gezond\u00ADheids\u00ADgegevens in één overzicht';

test('redirect to intro from login', () => {
    renderWithRouter({ initialEntries: ['/inloggen'] });

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingOne);
});

test('redirect to intro from protected route', () => {
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent(introHeadingOne);
});

test('redirect to login from protected route', () => {
    setIntroSeen(true);
    renderWithRouter({ initialEntries: ['/overzicht'] });

    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});
