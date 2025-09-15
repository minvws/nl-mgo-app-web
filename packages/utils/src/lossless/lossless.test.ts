import { LosslessNumber } from 'lossless-json';
import { expect, test } from 'vitest';
import { type Lossless, losslessParse, losslessStringify } from './lossless.js';

type TestData = {
    decimal: number;
    long: number;
    big: number;
};

test('losslessParse:parses jsons without losing precision', () => {
    const text = `{ 
        "decimal": 2.370, 
        "long" :9123372036854000123, 
        "big" :2.3e+500 
    }`;

    const json = losslessParse<TestData>(text);

    expect(json.decimal.value).toBe('2.370');
    expect(json.long.value).toBe('9123372036854000123');
    expect(json.big.value).toBe('2.3e+500');
});

test('losslessParse: parses deep number values without losing precision', () => {
    const text = `{ 
        "deep": { 
            "decimal": 2.370, 
            "long" :9123372036854000123, 
            "big" :2.3e+500 
        },
        "other": [{ 
            "decimal": 2.370, 
            "long" :9123372036854000123, 
            "big" :2.3e+500 
        }, {
            "foo": "bar"
        }]
    }`;

    const json = losslessParse<{ deep: TestData; other: (TestData | { foo: string })[] }>(text);

    expect(json.deep.decimal.value).toBe('2.370');
    expect(json.deep.long.value).toBe('9123372036854000123');
    expect(json.deep.big.value).toBe('2.3e+500');

    expect((json.other[0] as Lossless<TestData>).decimal.value).toBe('2.370');
    expect((json.other[0] as Lossless<TestData>).long.value).toBe('9123372036854000123');
    expect((json.other[0] as Lossless<TestData>).big.value).toBe('2.3e+500');

    expect((json.other[1] as { foo: string }).foo).toBe('bar');
});

test('losslessParse: throws if the input is not a (JSON) string', () => {
    expect(() => losslessParse({} as string)).toThrowError('Input is not a (JSON) string');
});

test('losslessStringify: can stringify objects containing LosslessNumber', () => {
    const data = {
        value: new LosslessNumber('2.370'),
    };

    expect(losslessStringify(data)).toBe(`{"value":2.370}`);
});
