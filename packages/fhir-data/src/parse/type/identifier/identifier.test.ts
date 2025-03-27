import { faker } from '$test';
import { expect, test } from 'vitest';
import { codeableConcept } from '../codeableConcept/codeableConcept';
import { identifier } from './identifier';

test('identifier', () => {
    const data = faker.fhir.identifier();
    const { use, system, value, type } = data;
    const expected = {
        _type: 'Identifier',
        use,
        system,
        value,
        type: codeableConcept(type),
    };
    expect(identifier(data)).toEqual(expected);
});
