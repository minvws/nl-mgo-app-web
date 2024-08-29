import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { coding } from './coding';

testSet('coding', faker.fhir.coding, (data) => {
    const { code, display, system } = data;
    const expected = { code, display, system };
    expect(coding(data)).toEqual(expected);
});
