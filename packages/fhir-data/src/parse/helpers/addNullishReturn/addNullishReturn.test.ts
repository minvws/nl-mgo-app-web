import { expect, test } from 'vitest';
import { addNullishReturn } from './addNullishReturn';

test('wraps function that returns null if value is nullish', () => {
    const passThrough = <T>(x: T) => x;
    const wrapped = addNullishReturn(passThrough);

    expect(wrapped(undefined)).toBe(null);
    expect(wrapped(null)).toBe(null);
});

test.each([0, 1, '', '0', false, true, {}, []])('does not change value for %j', (value) => {
    const passThrough = <T>(x: T) => x;
    const wrapped = addNullishReturn(passThrough);
    expect(wrapped(value)).toEqual(value);
});
