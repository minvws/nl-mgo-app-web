import type { Config } from '$/lib/config';

export const config: Config = {} as Config;

resetConfig();

export function resetConfig() {
    config.oidc = {
        authority: 'http://localhost:5000',
        client_id: 'client_id',
        redirect_uri: 'http://localhost:3000',
    };
}
