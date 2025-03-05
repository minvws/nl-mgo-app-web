import { faker } from '$test/faker';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { USER_INFO_SESSION_STORAGE_KEY } from './getUserInfo';
import { takeUserInfoFromUrl } from './takeUserInfoFromUrl';

const mockGetUserInfoFromUrl = takeUserInfoFromUrl as MockedFunction<typeof takeUserInfoFromUrl>;

vi.mock(
    './takeUserInfoFromUrl',
    () => ({ takeUserInfoFromUrl: vi.fn() }) as typeof import('./takeUserInfoFromUrl') // eslint-disable-line @typescript-eslint/consistent-type-imports
);

beforeEach(() => {
    vi.resetModules();
});

test('initialUserInfo is read from session storage', async () => {
    const expectedUserInfo = faker.custom.userInfo();
    mockGetUserInfoFromUrl.mockImplementation(() => undefined);

    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn((key: string) => {
            if (key === USER_INFO_SESSION_STORAGE_KEY) {
                return JSON.stringify(expectedUserInfo);
            }
            return null;
        }),
    } as Partial<Storage>);

    const { getUserInfo } = await import('./getUserInfo');
    const { userInfo, error } = getUserInfo();

    expect(userInfo).toEqual(expectedUserInfo);
    expect(error).toBe(null);
});

test('initialUserInfo from the url takes priority', async () => {
    const userInfoSessionStorage = faker.custom.userInfo();
    const userInfoUrl = faker.custom.userInfo();
    mockGetUserInfoFromUrl.mockImplementation(() => userInfoUrl);

    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn((key: string) => {
            if (key === USER_INFO_SESSION_STORAGE_KEY) {
                return JSON.stringify(userInfoSessionStorage);
            }
            return null;
        }),
    } as Partial<Storage>);

    const { getUserInfo } = await import('./getUserInfo');
    const { userInfo, error } = getUserInfo();

    expect(userInfo).toEqual(userInfoUrl);
    expect(error).toBe(null);
});

test('initialUserInfo returns null if nor the url nor the session storage container userinfo', async () => {
    mockGetUserInfoFromUrl.mockImplementation(() => undefined);

    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn(() => null),
    } as Partial<Storage>);

    const { getUserInfo } = await import('./getUserInfo');
    const { userInfo, error } = getUserInfo();

    expect(userInfo).toEqual(null);
    expect(error).toBe(null);
});

test('parsing error is set when retrieveing the userinfo fails', async () => {
    const parsingError = new Error();
    mockGetUserInfoFromUrl.mockImplementation(() => {
        throw parsingError;
    });

    const { getUserInfo } = await import('./getUserInfo');
    const { userInfo, error } = getUserInfo();

    expect(userInfo).toEqual(null);
    expect(error).toBe(parsingError);
});
