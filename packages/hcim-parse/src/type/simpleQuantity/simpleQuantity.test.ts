import { faker } from '$test';
import { expect, test } from 'vitest';
import { simpleQuantity } from './simpleQuantity.js';

test('simpleQuantity', () => {
    const data = faker.fhir.simpleQuantity();
    const { value, unit, system, code } = data;
    const expected = {
        _type: 'simpleQuantity',
        value,
        unit,
        system,
        code,
    };
    expect(simpleQuantity(data)).toEqual(expected);
});
