import { expect, test, vi, afterEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { readConfig } from './config';

vi.unmock('./config');

afterEach(() => {
    vi.unstubAllGlobals();
});

test('readConfig throws if window.config is missing', () => {
    expect(() => readConfig()).toThrow();
});

test.each([undefined, null, faker.datatype.boolean(), faker.lorem.word()])(
    'readConfig throws if window.config is not an object (%j)',
    (config) => {
        vi.stubGlobal('config', config);
        expect(() => readConfig()).toThrow();
    }
);

test.each([undefined, null, faker.datatype.boolean(), faker.lorem.word()])(
    'readConfig throws if window.config.oidc_authority is not an URL (%j)',
    (oidc_authority) => {
        vi.stubGlobal('config', {
            oidc_authority,
            oidc_client_id: faker.lorem.word(),
            oidc_redirect_uri: faker.internet.url(),
        });
        expect(() => readConfig()).toThrow();
    }
);

test.each([undefined, null, faker.datatype.boolean()])(
    'readConfig throws if window.config.oidc_client_id is not a string (%j)',
    (oidc_client_id) => {
        vi.stubGlobal('config', {
            oidc_authority: faker.internet.url(),
            oidc_client_id,
            oidc_redirect_uri: faker.internet.url(),
        });
        expect(() => readConfig()).toThrow();
    }
);

test.each([undefined, null, faker.datatype.boolean(), faker.lorem.word()])(
    'readConfig throws if window.config.oidc_redirect_uri is not an URL (%j)',
    (oidc_redirect_uri) => {
        vi.stubGlobal('config', {
            oidc_authority: faker.internet.url(),
            oidc_client_id: faker.lorem.word(),
            oidc_redirect_uri,
        });
        expect(() => readConfig()).toThrow();
    }
);

test('readConfig returns object when all window.config properties are valid', () => {
    const config = {
        oidc_authority: faker.internet.url(),
        oidc_client_id: faker.lorem.word(),
        oidc_redirect_uri: faker.internet.url(),
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
    };
    vi.stubGlobal('config', config);
    expect(readConfig()).toEqual({
        oidc: {
            authority: config.oidc_authority,
            client_id: config.oidc_client_id,
            redirect_uri: config.oidc_redirect_uri,
        },
        load_url: config.load_url,
        dva_url: config.dva_url,
    });
});
