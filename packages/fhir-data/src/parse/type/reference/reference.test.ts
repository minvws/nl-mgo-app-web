import { faker, testSet } from '$test';
import { expect } from 'vitest';
import * as special from './reference';

testSet('reference', faker.fhir.reference, (data) => {
    const { reference, display } = data;
    const expected = {
        reference,
        display,
    };
    expect(special.reference(data)).toEqual(expected);
});
