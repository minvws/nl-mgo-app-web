import { faker } from '$test';
import { expect, test } from 'vitest';
import { createTypeParser } from './createTypeParser.js';

test('wraps function that returns undefined if value is nullish', () => {
    const passThrough = <T>(x: T) => x;
    const wrapped = createTypeParser<any, any>(passThrough); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(wrapped(undefined)).toBeUndefined();
    expect(wrapped(null)).toBeUndefined();
});

test.each([0, 1, '', '0', false, true, {}, []])('does not change value for %j', (value) => {
    const passThrough = <T>(x: T) => ({
        _type: faker.lorem.word(),
        value: x,
    });
    const wrapped = createTypeParser<any, any>(passThrough); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(wrapped(value).value).toEqual(value);
});
