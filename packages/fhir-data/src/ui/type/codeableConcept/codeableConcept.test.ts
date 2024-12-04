import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCodeableConcept } from '../../../parse/type';
import { codeableConcept } from './codeableConcept';
import { coding } from '../coding/coding';

test('codeableConcept prefers text value', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const concept: MgoCodeableConcept = {
        text: faker.lorem.sentence(),
        coding: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    const result = codeableConcept(label, concept, options);

    expect(result).toEqual({
        label,
        type: 'MULTIPLE_VALUES',
        display: [concept.text],
        ...options,
    });
});

test('codeableConcept uses conding values as fallback', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const concept: MgoCodeableConcept = {
        text: undefined,
        coding: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    const result = codeableConcept(label, concept, options);

    const {
        coding: [coding1, coding2],
    } = concept;

    expect(result).toEqual({
        label,
        type: 'MULTIPLE_VALUES',
        display: [coding('', coding1).display, coding('', coding2).display],
        ...options,
    });
});
