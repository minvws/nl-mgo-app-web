import { expect, test } from 'vitest';
import { replaceUndefined } from './replaceUndefined';

test('returns null for undefined', () => {
    expect(replaceUndefined(undefined)).toBe(null);
});

test('returns null for null', () => {
    expect(replaceUndefined(null)).toBe(null);
});

test.each([0, 1, '', '0', false, true, {}, []])('returns %j for %j', (value) => {
    expect(replaceUndefined(value)).toEqual(value);
});
