import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { quantity } from './quantity';

testSet('quantity', faker.fhir.quantity, (data) => {
    const { value, comparator, unit, system, code } = data;
    const expected = {
        value,
        comparator,
        unit,
        system,
        code,
    };
    expect(quantity(data)).toEqual(expected);
});
