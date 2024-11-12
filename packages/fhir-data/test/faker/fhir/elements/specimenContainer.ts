import { faker } from '@faker-js/faker';
import { type SpecimenContainer } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, identifier, quantity, reference } from '../type';
import { collection } from '$test/faker/helpers';

export const specimenContainer = createMockDataFactory<SpecimenContainer>(() => {
    return {
        additiveCodeableConcept: codeableConcept(),
        additiveReference: reference(),
        capacity: quantity(),
        description: faker.lorem.word(),
        identifier: collection({ max: 1, factory: identifier }),
        specimenQuantity: quantity(),
        type: codeableConcept(),
    };
});
