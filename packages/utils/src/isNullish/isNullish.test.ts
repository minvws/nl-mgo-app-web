import { expect, test } from 'vitest';
import { isNullish } from './isNullish.js';

test('returns true for undefined', () => {
    expect(isNullish(undefined)).toBe(true);
});

test('returns true for null', () => {
    expect(isNullish(null)).toBe(true);
});

test.each([0, 1, '', '0', false, true, {}, []])('returns false for %j', (value) => {
    expect(isNullish(value)).toBe(false);
});
