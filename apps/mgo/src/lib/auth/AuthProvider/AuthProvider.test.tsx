import jwt from 'jsonwebtoken';
import { expect, test, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import openidConfigurationMock from './fixtures/openid-configuration-mock.json';
import { AuthProvider, useAuth } from '..';

vi.unmock('react-oidc-context');

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);
function createFetchReponse(
    data: NonNullable<unknown>,
    headers: Record<string, string> = { 'Content-Type': 'application/json' }
) {
    return new Response(JSON.stringify(data), { status: 200, statusText: 'OK', headers });
}

const locationAssignMock = vi.fn();
function mockLocation(href?: string) {
    const locationMock = new URL(href || window.location.href);
    Object.defineProperty(locationMock, 'assign', { value: locationAssignMock, writable: false });
    vi.stubGlobal('location', locationMock);
}

const historyReplaceStateSpy = vi.spyOn(window.history, 'replaceState');

function MockApp() {
    const auth = useAuth();
    if (auth.activeNavigator === 'signinSilent') return 'logging in';
    if (auth.activeNavigator === 'signoutRedirect') return 'logging out';
    if (auth.isLoading) return 'loading';
    if (auth.error) return 'error';
    return auth.isAuthenticated ? (
        <button onClick={() => void auth.removeUser()}>log out</button>
    ) : (
        <button onClick={() => void auth.signinRedirect()}>log in</button>
    );
}

function WrappedMockApp() {
    return (
        <AuthProvider
            authority="http://localhost:5000"
            client_id="client_id"
            redirect_uri="http://localhost:3000"
        >
            <MockApp />
        </AuthProvider>
    );
}

test('sign-in', async () => {
    /*
     * This test is made up of two parts: the sign-in redirect and the sign-in
     * callback. It's in one long test because the OIDC client needs to
     * remember the `state` it sent in the redirect and check it against the
     * `state` it receives in the callback.
     */

    /*** PART ONE: the sign-in redirect ***/
    const locationBaseUrl = 'http://localhost:3000';
    mockLocation(locationBaseUrl);
    fetchMock.mockImplementation(() => createFetchReponse(openidConfigurationMock));

    render(<WrappedMockApp />);
    fireEvent.click(await screen.findByRole('button', { name: /log in/i }));

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:5000/.well-known/openid-configuration',
        expect.objectContaining({ method: 'GET' })
    );

    expect(locationAssignMock).toHaveBeenCalled();
    const url = new URL(locationAssignMock.mock.calls[0][0]);
    expect(url.origin).toBe('http://localhost:5000');
    expect(url.pathname).toBe('/authorize');
    const searchParams = Object.fromEntries(url.searchParams.entries());
    expect(searchParams).toEqual({
        client_id: 'client_id',
        code_challenge: expect.any(String),
        code_challenge_method: 'S256',
        lang: 'nl',
        nonce: expect.stringMatching(/^[0-9A-Za-z-._]{32}$/),
        redirect_uri: locationBaseUrl,
        response_type: 'code',
        scope: 'openid',
        state: expect.any(String),
    });

    /*** PART TWO: the sign-in callback ***/

    vi.resetAllMocks();

    const testCode = 'some_unique_string';
    mockLocation(`${locationBaseUrl}/?code=${testCode}&state=${searchParams.state}`);
    fetchMock.mockImplementationOnce(() => createFetchReponse(openidConfigurationMock));
    fetchMock.mockImplementationOnce(() =>
        createFetchReponse({
            token_type: 'Bearer',
            expires_in: 3600,
            id_token: jwt.sign(
                { iss: 'http://localhost:5000', sub: 'unique_user_id', aud: ['client_id'] },
                'some_secret' // in reality this would be a RS256 key, but this is good enough for the test
            ),
        })
    );

    render(<WrappedMockApp />);

    await vi.waitFor(() => expect(historyReplaceStateSpy).toHaveBeenCalled());
    expect(historyReplaceStateSpy).toHaveBeenCalledWith({}, '', '/');
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'http://localhost:5000/accesstoken',
        expect.anything()
    );
    const accesstokenRequestBody = Object.fromEntries(fetchMock.mock.calls[1][1].body);
    expect(accesstokenRequestBody).toEqual({
        client_id: 'client_id',
        code: testCode,
        code_verifier: expect.stringMatching(/[0-9a-f]+/),
        grant_type: 'authorization_code',
        redirect_uri: locationBaseUrl,
    });
});
