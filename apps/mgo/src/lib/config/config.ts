type UrlString = `http://${string}` | `https://${string}`;

/**
 * Read runtime config from window.config.
 * @throws
 */
export const readConfig = () => {
    const config = getConfig();
    return {
        oidc: {
            authority: readUrl(config, 'oidc_authority'),
            client_id: readString(config, 'oidc_client_id'),
            redirect_uri: readUrl(config, 'oidc_redirect_uri'),
        },
    };
};

export type Config = ReturnType<typeof readConfig>;

const getConfig = (): Record<string, unknown> => {
    if (!('config' in window)) throw new Error('window.config missing');
    if (!window.config) throw new Error('window.config is not an object');
    return window.config as Record<string, unknown>;
};

const readString = (obj: Record<string, unknown>, key: string): string => {
    const value = obj[key];
    if (typeof value !== 'string') throw new Error(`window["${key}"] is not a string`);
    return value;
};

const readUrl = (obj: Record<string, unknown>, key: string): UrlString => {
    const url = readString(obj, key);
    if (isUrlString(url)) return url;
    throw new Error(`["${key}"] not an URL: ${url}`);
};

const isUrlString = (value: string): value is UrlString => {
    return value.startsWith('https://') || value.startsWith('http://');
};
