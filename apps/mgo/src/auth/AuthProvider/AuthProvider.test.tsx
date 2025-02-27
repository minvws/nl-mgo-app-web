import { config } from '$/config';
import { render } from '@testing-library/react';
import { AuthProvider as ReactAuthProvider } from 'react-oidc-context';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { AuthProvider } from '..';

vi.mock('react-oidc-context', async (importActual) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const reactOidcContext = await importActual<typeof import('react-oidc-context')>();
    return {
        ...reactOidcContext,
        AuthProvider: vi.fn(),
    };
});

vi.mock('$/config', async () => {
    const { faker } = await import('@faker-js/faker');
    return {
        config: {
            oidc_authority: faker.internet.url(),
            oidc_client_id: faker.lorem.word(),
            oidc_redirect_uri: faker.internet.url(),
        },
    } as typeof import('$/config'); // eslint-disable-line @typescript-eslint/consistent-type-imports
});

const MockProvider = ReactAuthProvider as MockedFunction<typeof ReactAuthProvider>;

test('Authprovider uses config values', () => {
    render(<AuthProvider lang="nl" />);
    expect(MockProvider.mock.calls[0][0]).toEqual(
        expect.objectContaining({
            authority: config.oidc_authority,
            client_id: config.oidc_client_id,
            redirect_uri: config.oidc_redirect_uri,
        })
    );
});

test('Redirects when user is removed', () => {
    const location = { replace: vi.fn() };
    vi.stubGlobal('location', location);

    render(<AuthProvider lang="nl" />);
    const { onRemoveUser } = MockProvider.mock.calls[0][0];

    onRemoveUser!();
    expect(location.replace).toHaveBeenCalledWith('/uitgelogd');
});

test('Resets history state when signed in', () => {
    const history = { replaceState: vi.fn() };
    vi.stubGlobal('location', { pathname: '/some-path' });
    vi.stubGlobal('history', history);

    render(<AuthProvider lang="nl" />);
    const { onSigninCallback } = MockProvider.mock.calls[0][0];

    onSigninCallback!();
    expect(history.replaceState).toHaveBeenCalledWith({}, '', window.location.pathname);
});
