export interface UserInfo {
    reference_pseudonym: {
        rid: string;
    };
    person: {
        age?: number;
        name?: {
            first_name?: string;
            prefix?: string;
            last_name?: string;
            initials?: string;
            full_name?: string;
        };
    };
}

const USER_INFO_SEARCH_PARAM = 'userinfo';

export function takeUserInfoFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const userinfoBase64 = urlParams.get(USER_INFO_SEARCH_PARAM);

    if (userinfoBase64) {
        const userInfoJson = atob(userinfoBase64);
        const userInfo = JSON.parse(userInfoJson) as UserInfo;
        urlParams.delete(USER_INFO_SEARCH_PARAM);
        const searchString = urlParams.size > 0 ? `?${urlParams}` : '';
        window.history.replaceState(null, '', `${window.location.pathname}${searchString}`);
        return userInfo;
    }

    return null;
}
