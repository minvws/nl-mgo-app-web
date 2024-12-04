import { faker } from '$test';
import { expect, test } from 'vitest';
import { dateTime } from './dateTime';
import { type DateTimeString } from '../../../types/Fhir';

test('format dateTime returns undefined for nullish', () => {
    const value = faker.custom.nullish();
    const result = dateTime(value);
    expect(result).toBeUndefined();
});
test('format dateTime returns empty string for empty strings', () => {
    const result = dateTime('' as DateTimeString);
    expect(result).toBe('');
});

test('format dateTime returns string value if the date is invalid', () => {
    const value = '2000-13-01T12:00:00';
    const result = dateTime(value);
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
    const result = dateTime(dateTimeString as DateTimeString);
    expect(result).toEqual(expected);
});
