import { faker } from '$test';
import { expect, test } from 'vitest';
import { quantity } from './quantity';

test('quantity', () => {
    const data = faker.fhir.quantity();
    const { value, comparator, unit, system, code } = data;
    const expected = {
        _type: 'quantity',
        value,
        comparator,
        unit,
        system,
        code,
    };
    expect(quantity(data)).toEqual(expected);
});
