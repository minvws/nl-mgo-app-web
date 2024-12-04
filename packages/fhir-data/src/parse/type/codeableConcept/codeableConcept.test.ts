import { faker } from '$test';
import { expect, test } from 'vitest';
import { map } from '../../../utils';
import { coding } from '../coding/coding';
import { codeableConcept } from './codeableConcept';

test('codeableConcept', () => {
    const concept = faker.fhir.codeableConcept({
        coding: faker.custom.collection({
            min: 1,
            max: 5,
            factory: faker.fhir.coding,
        }),
    });
    const expected = {
        text: concept.text,
        coding: map(concept.coding, coding),
    };

    expect(codeableConcept(concept)).toEqual(expected);
});

test('codeableConcept always returns coding array', () => {
    const concept = faker.fhir.codeableConcept();
    concept.coding = undefined;

    const expected = {
        text: concept.text,
        coding: [],
    };

    expect(codeableConcept(concept)).toEqual(expected);
});
