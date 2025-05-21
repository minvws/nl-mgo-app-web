import { faker } from '$test';
import { type DateTimeString } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { date } from './date';

test('format dateTime returns undefined for nullish', () => {
    const value = faker.custom.nullish();
    const result = date(faker.custom.uiHelperContext())(value);
    expect(result).toBeUndefined();
});
test('format dateTime returns empty string for empty strings', () => {
    const result = date(faker.custom.uiHelperContext())('' as DateTimeString);
    expect(result).toBe('');
});

test('format dateTime returns string value if the date is invalid', () => {
    const value = '2000-13-01T12:00:00';
    const result = date(faker.custom.uiHelperContext())(value);
    expect(result).toEqual('2000-13-01T12:00:00');
});

test.each<[string, string]>([
    ['2000', '2000'],
    ['2000-01', 'januari 2000'],
    ['2000-01-01', '1 januari 2000'],
    ['2000-01-01T10:25', '1 januari 2000 om 10:25'],
    ['2000-01-01T10:25:56', '1 januari 2000 om 10:25:56'],
    ['2000-01-01T10:25:56.123', '1 januari 2000 om 10:25:56,123'],
    ['2000-01-01T10:25:56.123Z', '1 januari 2000 om 11:25:56,123 GMT+1'],
    ['2000-01-01T10:25:56.123+10:00', '1 januari 2000 om 01:25:56,123 GMT+1'],
    ['2000-01-01T22:25-10:00', '2 januari 2000 om 09:25 GMT+1'],
])('format dateTime formats date "%s" into "%s"', (dateTimeString, expected) => {
    const result = date(faker.custom.uiHelperContext())(dateTimeString as DateTimeString);
    expect(result).toEqual(expected);
});

test.each<[string, string]>([
    ['2000', '2000'],
    ['2000-01', 'januari 2000'],
    ['2000-01-01', '1 januari 2000'],
    ['2000-01-01T10:25', '1 januari 2000 om 10:25'],
    ['2000-01-01T10:25:56', '1 januari 2000 om 10:25'],
    ['2000-01-01T10:25:56.123', '1 januari 2000 om 10:25'],
    ['2000-01-01T10:25:56.123Z', '1 januari 2000 om 11:25'],
    ['2000-01-01T10:25:56.123+10:00', '1 januari 2000 om 01:25'],
    ['2000-01-01T22:25-10:00', '2 januari 2000 om 09:25'],
])('format dateTime formats date "%s" into "%s"', (dateTimeString, expected) => {
    const result = date(
        faker.custom.uiHelperContext({
            isSummary: true,
        })
    )(dateTimeString as DateTimeString);
    expect(result).toEqual(expected);
});
