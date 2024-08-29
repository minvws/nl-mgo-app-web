import { expect, test } from 'vitest';
import { deepReplaceUndefined } from './deepReplaceUndefined';

const EMPTY_VALUE = null;

test('replaces undefined', () => {
    const data = undefined;
    const expected = EMPTY_VALUE;
    expect(deepReplaceUndefined(data)).toEqual(expected);
});

test.each([1, '2', {}, null, true, false, { foo: [1] }])(
    'does not change values other than undefined',
    (value) => {
        expect(deepReplaceUndefined(value)).toEqual(value);
    }
);

test('replaces any undefined props', () => {
    const data = {
        foo: 'bar',
        bar: undefined,
    };
    const expected = {
        foo: 'bar',
        bar: EMPTY_VALUE,
    };
    expect(deepReplaceUndefined(data)).toEqual(expected);
});

test('replaces any undefined array values', () => {
    const data = [1, undefined, 3];
    const expected = [1, EMPTY_VALUE, 3];
    expect(deepReplaceUndefined(data)).toEqual(expected);
});

test('does not change any other type other than undefined', () => {
    const data = [1, '2', {}, undefined, null, true, false];
    const expected = [1, '2', {}, EMPTY_VALUE, EMPTY_VALUE, true, false];
    expect(deepReplaceUndefined(data)).toEqual(expected);
});

test('replaces any deeply nested undefined props', () => {
    const data = {
        foo: 'bar',
        bar: {
            baz: undefined,
            bak: ['one', undefined, 'three'],
        },
    };
    const expected = {
        foo: 'bar',
        bar: {
            baz: EMPTY_VALUE,
            bak: ['one', EMPTY_VALUE, 'three'],
        },
    };
    expect(deepReplaceUndefined(data)).toEqual(expected);
});
