import { expect, test } from 'vitest';
import { parseJson } from './json';
import { type LosslessNumber } from 'lossless-json';

type TestData = {
    decimal: LosslessNumber;
    long: LosslessNumber;
    big: LosslessNumber;
};

test('parses jsons without losing precision', () => {
    const text = `{ 
        "decimal": 2.370, 
        "long" :9123372036854000123, 
        "big" :2.3e+500 
    }`;

    const json = parseJson(text) as TestData;

    expect(json.decimal.value).toBe('2.370');
    expect(json.long.value).toBe('9123372036854000123');
    expect(json.big.value).toBe('2.3e+500');
});

test('parses deep number values without losing precision', () => {
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

    const json = parseJson(text) as { deep: TestData; other: (TestData | { foo: string })[] };

    expect(json.deep.decimal.value).toBe('2.370');
    expect(json.deep.long.value).toBe('9123372036854000123');
    expect(json.deep.big.value).toBe('2.3e+500');

    expect((json.other[0] as TestData).decimal.value).toBe('2.370');
    expect((json.other[0] as TestData).long.value).toBe('9123372036854000123');
    expect((json.other[0] as TestData).big.value).toBe('2.3e+500');

    expect((json.other[1] as { foo: string }).foo).toBe('bar');
});
