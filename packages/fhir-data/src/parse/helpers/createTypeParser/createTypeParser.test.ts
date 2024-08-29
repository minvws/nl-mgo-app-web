import { expect, test } from 'vitest';
import { createTypeParser } from './createTypeParser';

test('wraps function that returns undefined if value is nullish', () => {
    const passThrough = <T>(x: T) => x;
    const wrapped = createTypeParser<unknown, unknown>(passThrough);

    expect(wrapped(undefined)).toBeUndefined();
    expect(wrapped(null)).toBeUndefined();
});

test.each([0, 1, '', '0', false, true, {}, []])('does not change value for %j', (value) => {
    const passThrough = <T>(x: T) => x;
    const wrapped = createTypeParser<unknown, unknown>(passThrough);
    expect(wrapped(value)).toEqual(value);
});
