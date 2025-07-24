import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type SpecimenContainer } from 'fhir/r3';
import { codeableConcept, identifier, quantity, reference } from '../type/index.js';

export const specimenContainer = createMockFactory<SpecimenContainer>(() => {
    return {
        additiveCodeableConcept: codeableConcept(),
        additiveReference: reference(),
        capacity: quantity(),
        description: faker.lorem.word(),
        identifier: mockArray({ max: 1, factory: identifier }),
        specimenQuantity: quantity(),
        type: codeableConcept(),
    };
});
