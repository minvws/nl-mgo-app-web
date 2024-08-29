import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { quantity } from '../quantity/quantity';
import { range } from './range';

testSet('range', faker.fhir.range, (data) => {
    const { low, high } = data;
    const expected = {
        low: quantity(low),
        high: quantity(high),
    };
    expect(range(data)).toEqual(expected);
});
