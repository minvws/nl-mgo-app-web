import { expect, test } from 'vitest';
import { isNonNullish } from './isNonNullish.js';

test('returns false for undefined', () => {
    expect(isNonNullish(undefined)).toBe(false);
});

test('returns false for null', () => {
    expect(isNonNullish(null)).toBe(false);
});

test.each([0, 1, '', '0', false, true, {}, []])('returns false for %j', (value) => {
    expect(isNonNullish(value)).toBe(true);
});
