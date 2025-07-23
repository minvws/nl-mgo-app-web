import { expect, test } from 'vitest';
import { toString } from './toString';

test.each([null, undefined])('returns undefined for %j', (value) => {
    expect(toString(value)).toBe(undefined);
});

test.each([
    ['', ''],
    ['foo', 'foo'],
    [false, 'false'],
    [true, 'true'],
])('converts %j to %j', (value, expected) => {
    expect(toString(value)).toBe(expected);
});
