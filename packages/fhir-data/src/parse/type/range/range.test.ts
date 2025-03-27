import { faker } from '$test';
import { expect, test } from 'vitest';
import { quantity } from '../quantity/quantity';
import { range } from './range';

test('range', () => {
    const data = faker.fhir.range();
    const { low, high } = data;
    const expected = {
        _type: 'Range',
        low: quantity(low),
        high: quantity(high),
    };
    expect(range(data)).toEqual(expected);
});
