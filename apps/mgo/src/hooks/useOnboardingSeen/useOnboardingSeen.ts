export const LOCAL_STORAGE_KEY = 'onboarding_seen';

const getOnboardingSeen = (): boolean => {
    const onboardingSeen = localStorage.getItem(LOCAL_STORAGE_KEY);
    return onboardingSeen !== null && /^\d{4}-\d{2}-\d{2}T/.test(onboardingSeen);
};

const setOnboardingSeen = (seen: boolean = true) => {
    if (seen) localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
    else localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const useOnboardingSeen = () => ({
    setOnboardingSeen,
    get isOnboardingSeen() {
        return getOnboardingSeen();
    },
});
