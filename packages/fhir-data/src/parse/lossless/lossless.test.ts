import { expect, test } from 'vitest';
import { losslessParse, losslessStringify } from './lossless';
import { LosslessNumber } from 'lossless-json';

type TestData = {
    decimal: LosslessNumber;
    long: LosslessNumber;
    big: LosslessNumber;
};

test('losslessParse:parses jsons without losing precision', () => {
    const text = `{ 
        "decimal": 2.370, 
        "long" :9123372036854000123, 
        "big" :2.3e+500 
    }`;

    const json = losslessParse(text) as TestData;

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

    const json = losslessParse(text) as { deep: TestData; other: (TestData | { foo: string })[] };

    expect(json.deep.decimal.value).toBe('2.370');
    expect(json.deep.long.value).toBe('9123372036854000123');
    expect(json.deep.big.value).toBe('2.3e+500');

    expect((json.other[0] as TestData).decimal.value).toBe('2.370');
    expect((json.other[0] as TestData).long.value).toBe('9123372036854000123');
    expect((json.other[0] as TestData).big.value).toBe('2.3e+500');

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

test('losslessStringify: can apply a default format to its output', () => {
    const data = {
        value: new LosslessNumber('2.370'),
    };

    expect(losslessStringify(data, true)).toBe(`{
  "value": 2.370
}`);
});
