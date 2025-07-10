import { useAuth, type AuthState } from '$/auth';
import { getAuthUrl, type AuthUrlResponse } from '$/services/vad/vad';
import { faker } from '$test/faker';
import { defer, flushCallStack } from '@minvws/mgo-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { VadAuthProvider, type VadAuthProviderProps } from './VadAuthProvider';
import { USER_INFO_SESSION_STORAGE_KEY } from './getUserInfoFromSession';
import { takeUserInfoFromUrl } from './takeUserInfoFromUrl';

const mockNavigate = vi.fn();
const mockGetAuthUrl = getAuthUrl as MockedFunction<typeof getAuthUrl>;
const mockTakeUserInfoFromUrl = takeUserInfoFromUrl as MockedFunction<typeof takeUserInfoFromUrl>;

vi.mock(
    '$/services/vad/vad',
    () => ({ getAuthUrl: vi.fn() }) as typeof import('$/services/vad/vad')
);

vi.mock('./takeUserInfoFromUrl', () => ({ takeUserInfoFromUrl: vi.fn(() => null) }));

vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

type TestAppProps = { readonly onAuth: (value: AuthState) => void };
const TestApp = ({ onAuth }: TestAppProps) => {
    const auth = useAuth();
    onAuth(auth);
    return (
        <div>
            <button onClick={auth.login}>login</button>
            <button onClick={auth.logout}>logout</button>
        </div>
    );
};

interface TestProviderProps extends TestAppProps {
    readonly navigate?: VadAuthProviderProps['navigate'];
}
const TestProvider = ({ onAuth, navigate }: TestProviderProps) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <VadAuthProvider navigate={navigate ?? vi.fn()}>
                <TestApp onAuth={onAuth} />
            </VadAuthProvider>
        </QueryClientProvider>
    );
};

beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
    } as Partial<Storage>);
});

test('does not attempt login on render', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    render(<TestProvider onAuth={onAuth} />);

    expect(mockGetAuthUrl).not.toHaveBeenCalled();
    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });
});

test('login loads the auth url and redirects', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    const deferredAuthUrl = defer<AuthUrlResponse>();
    const location: Partial<Location> = {};
    vi.stubGlobal('location', location);

    mockGetAuthUrl.mockImplementation(() => deferredAuthUrl.promise);

    const { rerender } = render(<TestProvider onAuth={onAuth} />);

    screen.getByRole('button', { name: 'login' }).click();

    rerender(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetAuthUrl).toHaveBeenCalled();

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: true,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });

    const authz_url = faker.internet.url();
    deferredAuthUrl.resolve({ authz_url });
    await flushCallStack();

    expect(location.href).toBe(authz_url);
});

test('if loading the auth url fails it updates the state', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    const deferredAuthUrl = defer<AuthUrlResponse>();
    const location: Partial<Location> = {};
    vi.stubGlobal('location', location);

    mockGetAuthUrl.mockImplementation(() => deferredAuthUrl.promise);

    const { rerender } = render(<TestProvider onAuth={onAuth} />);

    screen.getByRole('button', { name: 'login' }).click();

    rerender(<TestProvider onAuth={onAuth} />);

    const authLoadError = new Error();
    deferredAuthUrl.reject(authLoadError);

    await flushCallStack();

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: authLoadError,
        parsingError: null,
        userInfo: null,
    });

    expect(location.href).toBe(undefined);
});

test('if parsing the userinfo fails it updates the state', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    const parsingError = new Error();
    mockTakeUserInfoFromUrl.mockImplementationOnce(() => {
        throw parsingError;
    });

    const { rerender } = render(<TestProvider onAuth={onAuth} />);
    auth!.updateUserInfoFromUrl();
    rerender(<TestProvider onAuth={onAuth} />);

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError,
        userInfo: null,
    });
});

test('if no userinfo is found it updates the state with an error', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    mockTakeUserInfoFromUrl.mockImplementationOnce(() => null);

    const { rerender } = render(<TestProvider onAuth={onAuth} />);
    auth!.updateUserInfoFromUrl();
    rerender(<TestProvider onAuth={onAuth} />);

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError: new Error('No userinfo found!'),
        userInfo: null,
    });
});

test('provider loads userinfo from the urls when called and stores is in the session storage', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    const userInfo = faker.custom.userInfo();

    mockTakeUserInfoFromUrl.mockReturnValue(userInfo);

    render(<TestProvider onAuth={onAuth} />);
    auth!.updateUserInfoFromUrl();
    await flushCallStack();

    expect(mockTakeUserInfoFromUrl).toHaveBeenCalledOnce();
    expect(mockGetAuthUrl).not.toHaveBeenCalled();

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: true,
        loadingError: null,
        parsingError: null,
        userInfo,
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
        USER_INFO_SESSION_STORAGE_KEY,
        JSON.stringify(userInfo)
    );
});

test('logout clears the session storage and navigates to the logout page', async () => {
    let auth: AuthState;
    const onAuth = (authState: AuthState) => (auth = authState);
    const userInfo = faker.custom.userInfo();
    const navigate = vi.fn();
    (sessionStorage.getItem as MockedFunction<typeof sessionStorage.getItem>).mockReturnValueOnce(
        JSON.stringify(userInfo)
    );

    vi.stubGlobal('location', location);
    vi.stubGlobal('sessionStorage', sessionStorage);

    render(<TestProvider onAuth={onAuth} navigate={navigate} />);

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: true,
        loadingError: null,
        parsingError: null,
        userInfo,
    });

    const logoutButton = screen.getByRole('button', { name: 'logout' });
    logoutButton.click();

    await flushCallStack();

    expect(auth!).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });

    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/uitgelogd');
});
