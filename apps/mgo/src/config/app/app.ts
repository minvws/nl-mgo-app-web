import { isNullish } from '@minvws/mgo-utils';
import { SetRequired } from 'type-fest';

interface RawAppConfig {
    enable_debug_logging?: boolean;
    enable_missing_translation_errors?: boolean;
    load_url: string;
    dva_url: string;
    pft_url: string;
    organizations_url: string;
    data_service_endpoints_url: string;
}
type ConfigKey = keyof RawAppConfig;
type TypeAsString<T> = T extends string ? 'string' : T extends boolean ? 'boolean' : never;

export type AppConfig = SetRequired<RawAppConfig, ConfigKey>;

function getValue<K extends ConfigKey>(
    config: RawAppConfig,
    key: K,
    type: TypeAsString<AppConfig[K]>,
    defaultValue?: AppConfig[K]
): AppConfig[K] {
    const value = config[key] ?? defaultValue;
    if (isNullish(value)) {
        throw new Error(`Missing config setting: ${key}.`);
    }
    if (typeof value !== type) {
        throw new Error(`Config setting ${key} must be a ${type}. Got ${typeof value}.`);
    }
    return value as AppConfig[K];
}

const readConfig = (): Readonly<AppConfig> => {
    const config = (window as any).config as RawAppConfig | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!config) {
        throw new TypeError('window.config missing');
    }

    return Object.freeze({
        enable_debug_logging: getValue(config, 'enable_debug_logging', 'boolean', false),
        enable_missing_translation_errors: getValue(
            config,
            'enable_missing_translation_errors',
            'boolean',
            false
        ),
        load_url: getValue(config, 'load_url', 'string'),
        dva_url: getValue(config, 'dva_url', 'string'),
        pft_url: getValue(config, 'pft_url', 'string'),
        organizations_url: getValue(config, 'organizations_url', 'string'),
        data_service_endpoints_url: getValue(config, 'data_service_endpoints_url', 'string'),
    });
};

export const appConfig = readConfig();
