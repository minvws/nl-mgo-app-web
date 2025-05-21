import { faker } from '$test';
import { expect, test } from 'vitest';
import { quantityProps } from '../quantity/quantity';
import { range } from './range';

test('range', () => {
    const data = faker.fhir.range();
    const { low, high } = data;
    const expected = {
        _type: 'range',
        low: low && quantityProps(low),
        high: high && quantityProps(high),
    };
    expect(range(data)).toEqual(expected);
});
