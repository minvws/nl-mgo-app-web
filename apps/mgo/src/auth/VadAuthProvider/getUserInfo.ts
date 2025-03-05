import { takeUserInfoFromUrl, type UserInfo } from './takeUserInfoFromUrl';

export const USER_INFO_SESSION_STORAGE_KEY = 'mgo-userinfo';

export { type UserInfo };

// Store the user info that is extracted before the app initialization
let userInfo: UserInfo | null = null;
let userInfoError: Error | null = null;

try {
    const userInfoSessionJson = sessionStorage.getItem(USER_INFO_SESSION_STORAGE_KEY);
    const userInfoSession = userInfoSessionJson
        ? (JSON.parse(userInfoSessionJson) as UserInfo)
        : null;
    const userInfoUrl = takeUserInfoFromUrl();
    userInfo = userInfoUrl ?? userInfoSession;
} catch (error) {
    userInfoError = error as Error;
}

export function getUserInfo() {
    return {
        userInfo,
        error: userInfoError,
    };
}
