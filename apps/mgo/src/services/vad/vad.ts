import { config } from '$/config';
import ky from 'ky';

export type AuthUrlRequest = { callbackUrl: string };
export type AuthUrlResponse = { authz_url: string };

export async function getAuthUrl({ callbackUrl }: AuthUrlRequest) {
    return ky
        .post('oidc/start', {
            prefixUrl: config.dva_url,
            json: { client_callback_url: callbackUrl },
        })
        .json<AuthUrlResponse>();
}
