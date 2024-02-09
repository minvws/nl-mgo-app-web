export const LOCAL_STORAGE_KEY = 'intro_seen';

export const getIntroSeen = (): boolean => {
    const introSeen = localStorage.getItem(LOCAL_STORAGE_KEY);
    return introSeen !== null && /^\d{4}-\d{2}-\d{2}T/.test(introSeen);
};

export const setIntroSeen = (seen: boolean = true) => {
    if (seen) localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
    else localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const useIntroSeen = () => ({
    isIntroSeen: getIntroSeen(),
    setIntroSeen,
});
