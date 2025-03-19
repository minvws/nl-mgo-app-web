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
        ignore_missing_translations: faker.datatype.boolean(),
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    const { config } = await import('$/config');

    expect(config).toEqual(globalConfig);
});

test('throws if any value is missing', async () => {
    const globalConfig: Partial<Config> = {
        load_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    expect(async () => {
        await import('$/config');
    }).rejects.toThrow();
});

test('ignores missing translations config key by default true', async () => {
    const globalConfig: Config = {
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    const { config } = await import('$/config');

    expect(config.ignore_missing_translations).toEqual(true);
});

test('ignores missing translations config key can be set to string', async () => {
    const globalConfig = {
        ignore_missing_translations: 'true',
        load_url: faker.internet.url(),
        dva_url: faker.internet.url(),
    };

    vi.stubGlobal('config', globalConfig);

    const { config } = await import('$/config');

    expect(config.ignore_missing_translations).toEqual(true);
});

test.each<[boolean, unknown]>([
    [true, undefined],
    [false, 'false'],
    [false, false],
    [true, 'true'],
    [true, true],
])(
    'ignores missing translations config key returns %s when set to %s',
    async (expectedResult, value) => {
        const globalConfig = {
            ignore_missing_translations: value,
            load_url: faker.internet.url(),
            dva_url: faker.internet.url(),
        };

        vi.stubGlobal('config', globalConfig);

        const { config } = await import('$/config');

        expect(config.ignore_missing_translations).toEqual(expectedResult);
    }
);
