import { faker } from '@faker-js/faker';
import { type MedicationIngredient } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, ratio, reference } from '../type';

export const medicationIngredient = createMockDataFactory<MedicationIngredient>(() => {
    return {
        amount: ratio(),
        isActive: faker.datatype.boolean(),
        itemCodeableConcept: codeableConcept(),
        itemReference: reference(),
    };
});
