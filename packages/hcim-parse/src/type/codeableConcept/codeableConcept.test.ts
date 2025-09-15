import { faker } from '$test';
import { map } from '@minvws/mgo-utils';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { expect, test } from 'vitest';
import { codingProps } from '../coding/coding.js';
import { codeableConcept } from './codeableConcept.js';

test('codeableConcept', () => {
    const concept = faker.fhir.codeableConcept({
        coding: mockArray({
            min: 1,
            max: 5,
            factory: faker.fhir.coding,
        }),
    });
    const expected = {
        _type: 'codeableConcept',
        text: concept.text,
        coding: map(concept.coding, codingProps),
    };

    expect(codeableConcept(concept)).toEqual(expected);
});

test('codeableConcept always returns coding array', () => {
    const concept = faker.fhir.codeableConcept();
    concept.coding = undefined;

    const expected = {
        _type: 'codeableConcept',
        text: concept.text,
        coding: [],
    };

    expect(codeableConcept(concept)).toEqual(expected);
});
