export interface AppConfig {
    ignore_missing_translations?: boolean;
    load_url: string;
    dva_url: string;
    pft_url: string;
}

const readConfig = () => {
    const config = (window as any).config as AppConfig | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!config) {
        throw new Error('window.config missing');
    }

    return Object.freeze({
        ignore_missing_translations: parseBoolean(config['ignore_missing_translations']) ?? true,
        load_url: getConfigSetting(config, 'load_url'),
        dva_url: getConfigSetting(config, 'dva_url'),
        pft_url: getConfigSetting(config, 'pft_url'),
    });
};

function parseBoolean(value: unknown): boolean | undefined {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
}

function getConfigSetting<K extends keyof AppConfig>(config: AppConfig, key: K): AppConfig[K] {
    const value = config[key];
    if (!value) {
        throw new Error(`Missing config setting: ${key}.`);
    }
    return value;
}

export const appConfig = readConfig();
