import { faker } from '$test';
import { expect, test } from 'vitest';
import { codeableConceptProps } from '../codeableConcept/codeableConcept.js';
import { identifier } from './identifier.js';

test('identifier', () => {
    const data = faker.fhir.identifier();
    const { use, system, value, type } = data;
    const expected = {
        _type: 'identifier',
        use,
        system,
        value,
        type: type && codeableConceptProps(type),
    };
    expect(identifier(data)).toEqual(expected);
});
