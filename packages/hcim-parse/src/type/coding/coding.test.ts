import { faker } from '$test';
import { expect, test } from 'vitest';
import { coding } from './coding.js';

test('coding', () => {
    const data = faker.fhir.coding();
    const { code, display, system } = data;
    const expected = { _type: 'coding', code, display, system };
    expect(coding(data)).toEqual(expected);
});
