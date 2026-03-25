import { beforeEach, expect, test, vi } from 'vitest';

import type { AppConfig } from '$/config';
import { faker } from '$test/faker';
import { createMockFactory } from '$test/faker/factory';

vi.unmock('./app');

beforeEach(() => {
    vi.resetModules();
});

const mockConfig = createMockFactory<Partial<AppConfig>>(() => ({
    enable_debug_logging: faker.datatype.boolean(),
    enable_missing_translation_errors: faker.datatype.boolean(),
    load_url: faker.internet.url(),
    dva_url: faker.internet.url(),
    pft_url: faker.internet.url(),
    organizations_url: faker.internet.url(),
    data_service_endpoints_url: faker.internet.url(),
}));

test('importing the config throws if window.config is missing', () => {
    expect(async () => {
        await import('$/config');
    }).rejects.toThrow();
});

test('global config values are read', async () => {
    const globalConfig = mockConfig();
    vi.stubGlobal('config', globalConfig);

    const { appConfig } = await import('$/config');
    expect(appConfig).toEqual(globalConfig);
});

test('enable_missing_translation_errors defaults to false', async () => {
    const globalConfig = mockConfig();
    delete globalConfig.enable_missing_translation_errors;

    vi.stubGlobal('config', globalConfig);

    const { appConfig } = await import('$/config');
    expect(appConfig.enable_missing_translation_errors).toEqual(false);
});

test('enable_debug_logging defaults to false', async () => {
    const globalConfig = mockConfig();
    delete globalConfig.enable_debug_logging;

    vi.stubGlobal('config', globalConfig);

    const { appConfig } = await import('$/config');
    expect(appConfig.enable_debug_logging).toEqual(false);
});

test('throws if a required value is missing', async () => {
    const globalConfig = mockConfig();
    const missingKey = 'load_url';
    delete globalConfig[missingKey];

    vi.stubGlobal('config', globalConfig);

    expect(async () => {
        await import('$/config');
    }).rejects.toThrow(`Missing config setting: ${missingKey}.`);
});

test('throws if a wrong type is used', async () => {
    const globalConfig = mockConfig();
    (globalConfig as any).enable_missing_translation_errors = 'true'; // eslint-disable-line @typescript-eslint/no-explicit-any

    vi.stubGlobal('config', globalConfig);

    expect(async () => {
        await import('$/config');
    }).rejects.toThrow(
        `Config setting enable_missing_translation_errors must be a boolean. Got string.`
    );
});
