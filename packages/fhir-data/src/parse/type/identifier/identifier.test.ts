import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { codeableConcept } from '../codeableConcept/codeableConcept';
import { identifier } from './identifier';

testSet('identifier', faker.fhir.identifier, (data) => {
    const { use, system, value, type } = data;
    const expected = {
        use,
        system,
        value,
        type: codeableConcept(type),
    };
    expect(identifier(data)).toEqual(expected);
});
