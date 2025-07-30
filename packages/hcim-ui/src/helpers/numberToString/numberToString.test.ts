import { type LosslessNumber } from '@minvws/mgo-utils';
import { expect, test } from 'vitest';
import { numberToString } from './numberToString.js';

class LosslessNumberMock {
    constructor(private value: string) {}
    toString() {
        return this.value;
    }
}

test.each([null, undefined])('returns undefined for %j', (value) => {
    expect(numberToString(value)).toBe(undefined);
});

test.each([
    [1, '1'],
    [1.1, '1.1'],
    [1.123456789, '1.123456789'],
    [
        new LosslessNumberMock('1.1234567891011121314151617181920') as unknown as LosslessNumber,
        '1.1234567891011121314151617181920',
    ],
])('converts %j to %s', (value, expected) => {
    expect(numberToString(value)).toBe(expected);
});
