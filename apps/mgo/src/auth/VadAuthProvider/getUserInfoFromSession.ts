import { type UserInfo } from './takeUserInfoFromUrl';

export const USER_INFO_SESSION_STORAGE_KEY = 'mgo-userinfo';

export { type UserInfo };

export function getUserInfoFromSession() {
    const userInfoSessionJson = sessionStorage.getItem(USER_INFO_SESSION_STORAGE_KEY);
    if (userInfoSessionJson) {
        return JSON.parse(userInfoSessionJson) as UserInfo;
    }
    return null;
}
