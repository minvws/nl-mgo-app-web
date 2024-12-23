import { beforeAll, expect, test } from 'vitest';
import { type DateTimeString } from '../../types/Fhir';
import { dateTime } from '../../ui/format/dateTime/dateTime';
import { faker, testUiSchemaContext } from '$test';

beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).Intl = undefined;
    await import('./intlPolyfills');
});

test.each<[string, string]>([
    ['2000', '2000'],
    ['2000-01', 'januari 2000'],
    ['2000-01-01', '1 januari 2000'],
    ['2000-01-01T10:25', '1 januari 2000, 10:25'],
    ['2000-01-01T10:25:56', '1 januari 2000, 10:25:56'],
    ['2000-01-01T10:25:56.123', '1 januari 2000, 10:25:56'],
    ['2000-01-01T10:25:56.123Z', '1 januari 2000, 11:25:56 GMT+1'],
    ['2000-01-01T10:25:56.123+10:00', '1 januari 2000, 01:25:56 GMT+1'],
    ['2000-01-01T22:25-10:00', '2 januari 2000, 09:25 GMT+1'],
])('polyfill: format dateTime formats date "%s" into "%s"', (dateTimeString, expected) => {
    const result = dateTime(dateTimeString as DateTimeString);
    expect(result).toEqual(expected);
});

test('intl-polyfills: variables work as expected', () => {
    const context = testUiSchemaContext({ ignoreMissingTranslations: true });
    const result = context.intl.formatMessage(
        {
            id: faker.lorem.word(),
            defaultMessage: 'Hello {value}',
        },
        { value: 'World' }
    );
    expect(result).toEqual('Hello World');
});

test('intl-polyfills: puralization works as expected', () => {
    const context = testUiSchemaContext({ ignoreMissingTranslations: true });
    const result = context.intl.formatMessage(
        {
            id: faker.lorem.word(),
            defaultMessage: '{count, plural, one {één dag} other {{count, number} dagen}}',
        },
        { count: 10 }
    );
    expect(result).toEqual('10 dagen');
});

test('intl-polyfills: formatRelativeTime works as expected', () => {
    const context = testUiSchemaContext({ ignoreMissingTranslations: true });
    const result = context.intl.formatRelativeTime(-24, 'hour', { style: 'narrow' });
    expect(result).toEqual('24 uur geleden');
});

test('intl-polyfills: formatNumber works as expected', () => {
    const context = testUiSchemaContext({ ignoreMissingTranslations: true });
    const result = context.intl.formatNumber(1000, { style: 'currency', currency: 'EUR' });
    expect(result).toBe('€\xa01.000,00');
});
