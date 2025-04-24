import { faker } from '$test/faker';
import { expect, test, vi } from 'vitest';
import { getUserInfoFromSession, USER_INFO_SESSION_STORAGE_KEY } from './getUserInfoFromSession';

test('userinfo is read from session storage', async () => {
    const expectedUserInfo = faker.custom.userInfo();

    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn((key: string) => {
            if (key === USER_INFO_SESSION_STORAGE_KEY) {
                return JSON.stringify(expectedUserInfo);
            }
            return null;
        }),
    } as Partial<Storage>);

    const userInfo = getUserInfoFromSession();
    expect(userInfo).toEqual(expectedUserInfo);
});

test('userinfo is null when it is not in sessions storage', async () => {
    vi.stubGlobal('sessionStorage', {
        getItem: vi.fn(),
    } as Partial<Storage>);

    const userInfo = getUserInfoFromSession();
    expect(userInfo).toEqual(null);
});
