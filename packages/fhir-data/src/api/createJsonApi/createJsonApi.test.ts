import { faker } from '$test';
import { Locale } from '@minvws/mgo-mgo-intl';
import { expect, test } from 'vitest';
import { createJsonApi } from './createJsonApi';

type A = { locale: Locale; a: string; b: number };
type B = { c: string; d: number };

function foobar(a: A, b: B) {
    return {
        ...a,
        ...b,
    };
}

test('returns the json interface for a given function', () => {
    const jsonFoobar = createJsonApi(foobar);

    const inputA: A = {
        locale: Locale.NL_NL,
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
        locale: inputA.locale,
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
