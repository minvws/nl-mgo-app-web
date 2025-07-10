import { faker } from '$test';
import { type Nullable } from '@minvws/mgo-utils';
import { expect, test } from 'vitest';
import { createJsonApi } from './createJsonApi';

type A = { a: Nullable<string>; b: Nullable<number> };
type B = { c: Nullable<string>; d: Nullable<number> };

function foobar({ a, b }: A, { c, d }: B) {
    return {
        a,
        b,
        c,
        d,
    };
}

test('returns the json interface for a given function', () => {
    const jsonFoobar = createJsonApi(foobar);

    const inputA: A = {
        a: faker.lorem.sentence(),
        b: faker.number.int(),
    };
    const inputB: B = {
        c: faker.lorem.sentence(),
        d: faker.number.int(),
    };

    const resultJson = jsonFoobar(JSON.stringify(inputA), JSON.stringify(inputB));
    const result = JSON.parse(resultJson);

    expect(result).toEqual({
        a: inputA.a,
        b: inputA.b,
        c: inputB.c,
        d: inputB.d,
    });
});

test('can handle large numbers without losing precision', () => {
    const jsonFoobar = createJsonApi(foobar);

    const stringA = faker.lorem.sentence();
    const stringB = faker.lorem.sentence();
    const inputAJson = '{ "a": "' + stringA + '", "b": 9123372036854000123 }';
    const inputBJson = '{ "c": "' + stringB + '", "d": 2.3e+500 }';

    const resultJson = jsonFoobar(inputAJson.toString(), inputBJson.toString());

    expect(resultJson).toBe(
        '{"a":"' + stringA + '","b":9123372036854000123,"c":"' + stringB + '","d":2.3e+500}'
    );
});

test('converts undefined to null so it is included in the resulting JSON', () => {
    const func = () => ({
        a: undefined,
        b: null,
        c: -1,
        d: 0,
        e: {},
    });

    const jsonFunc = createJsonApi(func);
    const resultJson = jsonFunc();
    const result = JSON.parse(resultJson);

    expect(result).toEqual({
        a: null,
        b: null,
        c: -1,
        d: 0,
        e: {},
    });
});
