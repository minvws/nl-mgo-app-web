import { faker } from '@faker-js/faker';
import { createIntl as createFormatJsIntl } from '@formatjs/intl';
import { beforeAll, expect, test } from 'vitest';
import { getIntlConfig, type IntlOptions } from '../config/base/base';
import { Locale } from '../locale';

function createIntl(options: IntlOptions<string>) {
    return createFormatJsIntl(getIntlConfig(options));
}

beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).Intl = undefined;
    await import('./polyfills');
});

test('date work as expected', () => {
    const intl = createIntl({
        locale: Locale.NL_NL,
        messages: {},
        ignoreMissingTranslations: true,
    });
    const date = new Date('2000-01-01T10:25:56.123+10:00');
    const result = intl.formatDate(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    expect(result).toBe('1 januari 2000');
});

test('variables work as expected', () => {
    const intl = createIntl({
        locale: Locale.NL_NL,
        messages: {},
        ignoreMissingTranslations: true,
    });

    const variable = faker.lorem.word();
    const messageString = faker.lorem.sentence();
    const message = {
        id: faker.lorem.word(),
        defaultMessage: `${messageString} {value}`,
    };

    const result = intl.formatMessage(message, { value: variable });
    expect(result).toEqual(`${messageString} ${variable}`);
});

test('puralization works as expected', () => {
    const intl = createIntl({
        locale: Locale.NL_NL,
        messages: {},
        ignoreMissingTranslations: true,
    });
    const message = {
        id: faker.lorem.word(),
        defaultMessage: '{count, plural, one {één dag} other {{count, number} dagen}}',
    };
    const result = intl.formatMessage(message, { count: 10 });
    expect(result).toEqual('10 dagen');
});

test('formatRelativeTime works as expected', () => {
    const intl = createIntl({
        locale: Locale.NL_NL,
        messages: {},
        ignoreMissingTranslations: true,
    });

    const result = intl.formatRelativeTime(-24, 'hour', { style: 'narrow' });
    expect(result).toEqual('24 uur geleden');
});

test('formatNumber works as expected', () => {
    const intl = createIntl({
        locale: Locale.NL_NL,
        messages: {},
        ignoreMissingTranslations: true,
    });
    const result = intl.formatNumber(1000, { style: 'currency', currency: 'EUR' });
    expect(result).toBe('€\xa01.000,00');
});
