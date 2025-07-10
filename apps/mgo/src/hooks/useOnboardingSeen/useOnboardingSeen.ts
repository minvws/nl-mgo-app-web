export const LOCAL_STORAGE_KEY = 'onboarding_seen';

const getOnboardingSeen = (): boolean => {
    const onboardingSeen = localStorage.getItem(LOCAL_STORAGE_KEY);
    return onboardingSeen !== null && /^\d{4}-\d{2}-\d{2}T/.test(onboardingSeen);
};

const setOnboardingSeen = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
};

export const useOnboardingSeen = () => ({
    setOnboardingSeen,
    get isOnboardingSeen() {
        return getOnboardingSeen();
    },
});
