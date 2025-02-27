export interface Config {
    oidc_authority: string;
    oidc_client_id: string;
    oidc_redirect_uri: string;
    load_url: string;
    dva_url: string;
}

const readConfig = () => {
    const config = (window as any).config as Config | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!config) {
        throw new Error('window.config missing');
    }

    return Object.freeze({
        oidc_authority: getConfigSetting(config, 'oidc_authority'),
        oidc_client_id: getConfigSetting(config, 'oidc_client_id'),
        oidc_redirect_uri: getConfigSetting(config, 'oidc_redirect_uri'),
        load_url: getConfigSetting(config, 'load_url'),
        dva_url: getConfigSetting(config, 'dva_url'),
    });
};

function getConfigSetting<K extends keyof Config>(config: Config, key: K): Config[K] {
    const value = config[key];
    if (!value) {
        throw new Error(`Missing config setting: ${key}.`);
    }
    return value;
}

export const config = readConfig();
