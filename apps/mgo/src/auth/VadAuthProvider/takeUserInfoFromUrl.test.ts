import { faker } from '$test/faker';
import { expect, test, vi } from 'vitest';
import { takeUserInfoFromUrl } from './takeUserInfoFromUrl';

test('userinfo is read from the url search params', async () => {
    const userInfo = faker.custom.userInfo();
    const searchParams = new URLSearchParams({ userinfo: btoa(JSON.stringify(userInfo)) });
    const location: Partial<Location> = { search: searchParams.toString() };
    const history: Partial<History> = { replaceState: vi.fn() };
    vi.stubGlobal('location', location);
    vi.stubGlobal('history', history);

    const user = takeUserInfoFromUrl();
    expect(user).toBeDefined();
    expect(user).toEqual(userInfo);
});

test('if there is no userinfo it returns null', async () => {
    const searchParams = new URLSearchParams({ foobar: faker.lorem.word() });
    const location: Partial<Location> = { search: searchParams.toString() };
    const history: Partial<History> = { replaceState: vi.fn() };
    vi.stubGlobal('location', location);
    vi.stubGlobal('history', history);

    const user = takeUserInfoFromUrl();
    expect(user).toEqual(null);
});

test('when userinfo is read from the url it is removed', async () => {
    const userInfo = faker.custom.userInfo();
    const searchParams = new URLSearchParams({ userinfo: btoa(JSON.stringify(userInfo)) });
    const location: Partial<Location> = { search: searchParams.toString(), pathname: '/' };
    const history: Partial<History> = { replaceState: vi.fn() };
    vi.stubGlobal('location', location);
    vi.stubGlobal('history', history);

    const user = takeUserInfoFromUrl();
    expect(user).toBeDefined();
    expect(user).toEqual(userInfo);

    expect(history.replaceState).toHaveBeenCalledWith(null, '', location.pathname);
});

test('when userinfo is removed from the search params, it leaves other params intact', async () => {
    const userInfo = faker.custom.userInfo();
    const paramValues = {
        userinfo: btoa(JSON.stringify(userInfo)),
        foobar: faker.lorem.word(),
    };
    const searchParams = new URLSearchParams(paramValues);
    const location: Partial<Location> = {
        search: searchParams.toString(),
        pathname: `/${faker.lorem.slug()}`,
    };
    const history: Partial<History> = { replaceState: vi.fn() };
    vi.stubGlobal('location', location);
    vi.stubGlobal('history', history);

    const user = takeUserInfoFromUrl();
    expect(user).toBeDefined();
    expect(user).toEqual(userInfo);

    const expectedSearch = new URLSearchParams({ foobar: paramValues.foobar }).toString();
    expect(history.replaceState).toHaveBeenCalledWith(
        null,
        '',
        `${location.pathname}?${expectedSearch}`
    );
});
