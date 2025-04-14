import { useAuth, type AuthState } from '$/auth';
import { getAuthUrl, type AuthUrlResponse } from '$/services/vad/vad';
import { faker } from '$test/faker';
import { defer, flushCallStack } from '@minvws/mgo-mgo-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { VadAuthProvider, type VadAuthProviderProps } from './VadAuthProvider';
import { USER_INFO_SESSION_STORAGE_KEY, getUserInfo } from './getUserInfo';

const mockNavigate = vi.fn();
const mockGetAuthUrl = getAuthUrl as MockedFunction<typeof getAuthUrl>;
const mockGetUserInfo = getUserInfo as MockedFunction<typeof getUserInfo>;

vi.mock(
    '$/services/vad/vad',
    () => ({ getAuthUrl: vi.fn() }) as typeof import('$/services/vad/vad') // eslint-disable-line @typescript-eslint/consistent-type-imports
);
vi.mock('./getUserInfo', async (importActual) => {
    const module = await importActual<typeof import('./getUserInfo')>(); // eslint-disable-line @typescript-eslint/consistent-type-imports
    return {
        ...module,
        getUserInfo: vi.fn(() => ({
            userInfo: null,
            error: null,
        })),
    } as typeof import('./getUserInfo'); // eslint-disable-line @typescript-eslint/consistent-type-imports
});

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
});

test('does not attempt login on render', async () => {
    let auth: Partial<AuthState> = {};
    render(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetAuthUrl).not.toHaveBeenCalled();
    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });
});

test('login loads the auth url and redirects', async () => {
    let auth: Partial<AuthState> = {};
    const deferredAuthUrl = defer<AuthUrlResponse>();
    const location: Partial<Location> = {};
    vi.stubGlobal('location', location);

    mockGetAuthUrl.mockImplementation(() => deferredAuthUrl.promise);

    const { rerender } = render(<TestProvider onAuth={(authState) => (auth = authState)} />);

    const loginButton = screen.getByRole('button', { name: 'login' });
    await loginButton.click();

    rerender(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetAuthUrl).toHaveBeenCalled();

    expect(auth).toMatchObject<Partial<AuthState>>({
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
    let auth: Partial<AuthState> = {};
    const deferredAuthUrl = defer<AuthUrlResponse>();
    const location: Partial<Location> = {};
    vi.stubGlobal('location', location);

    mockGetAuthUrl.mockImplementation(() => deferredAuthUrl.promise);

    const { rerender } = render(<TestProvider onAuth={(authState) => (auth = authState)} />);

    const loginButton = screen.getByRole('button', { name: 'login' });
    await loginButton.click();

    rerender(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetAuthUrl).toHaveBeenCalled();

    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: true,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });

    const authLoadError = new Error();
    deferredAuthUrl.reject(authLoadError);

    await flushCallStack();

    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: authLoadError,
        parsingError: null,
        userInfo: null,
    });

    expect(location.href).toBe(undefined);
});

test('if parsing the userinfo fails on the initial render it updates the state', async () => {
    let auth: Partial<AuthState> = {};
    const parsingError = new Error();
    mockGetUserInfo.mockReturnValue({
        userInfo: null,
        error: parsingError,
    });

    render(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetUserInfo).toHaveBeenCalledOnce();
    expect(mockGetAuthUrl).not.toHaveBeenCalled();

    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError,
        userInfo: null,
    });
});

test('provider loads userinfo on initial render and stores is in the session storage', async () => {
    let auth: Partial<AuthState> = {};
    const userInfo = faker.custom.userInfo();

    mockGetUserInfo.mockReturnValue({
        userInfo,
        error: null,
    });

    const sessionStorage: Partial<Storage> = { setItem: vi.fn() };
    vi.stubGlobal('sessionStorage', sessionStorage);

    const { rerender } = render(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetUserInfo).toHaveBeenCalledOnce();
    expect(mockGetAuthUrl).not.toHaveBeenCalled();

    expect(auth).toMatchObject<Partial<AuthState>>({
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

    rerender(<TestProvider onAuth={(authState) => (auth = authState)} />);

    expect(mockGetUserInfo).toHaveBeenCalledTimes(2);
});

test('logout clears the session storage and navigates to the logout page', async () => {
    let auth: Partial<AuthState> = {};
    const userInfo = faker.custom.userInfo();
    mockGetUserInfo.mockReturnValue({
        userInfo,
        error: null,
    });
    const navigate = vi.fn();
    const sessionStorage: Partial<Storage> = { setItem: vi.fn(), clear: vi.fn() };

    vi.stubGlobal('location', location);
    vi.stubGlobal('sessionStorage', sessionStorage);

    render(<TestProvider onAuth={(authState) => (auth = authState)} navigate={navigate} />);

    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: true,
        loadingError: null,
        parsingError: null,
        userInfo,
    });

    const logoutButton = screen.getByRole('button', { name: 'logout' });
    await logoutButton.click();

    expect(auth).toMatchObject<Partial<AuthState>>({
        isLoading: false,
        isAuthenticated: false,
        loadingError: null,
        parsingError: null,
        userInfo: null,
    });

    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/uitgelogd');
});
