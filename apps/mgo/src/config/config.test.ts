import { beforeEach, expect, test, vi } from 'vitest';

import { type Config } from '$/config';
import { faker } from '$test/faker';

vi.unmock('$/config');

beforeEach(() => {
    vi.resetModules();
});

test('importing the config throws if window.config is missing', () => {
    expect(async () => {
        await import('$/config');
    }).rejects.toThrow();
});

test('global config values are read', async () => {
    const globalConfig: Config = {
        oidc_authority: faker.internet.url(),
        oidc_client_id: faker.lorem.word(),
        oidc_redirect_uri: faker.internet.url(),
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    const { config } = await import('$/config');

    expect(config).toEqual(globalConfig);
});

test('throws if any value is missing', async () => {
    const globalConfig: Partial<Config> = {
        oidc_authority: faker.internet.url(),
        oidc_client_id: faker.lorem.word(),
        oidc_redirect_uri: faker.internet.url(),
        load_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    expect(async () => {
        await import('$/config');
    }).rejects.toThrow();
});
