import type { Config } from '$/lib/config/config';

export const config: Config = {
    oidc: {
        authority: 'http://localhost:5000',
        client_id: 'client_id',
        redirect_uri: 'http://localhost:3000',
    },
};
