import { faker } from '@faker-js/faker';
import { type MedicationIngredient } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { codeableConcept, ratio, reference } from '../type';

export const medicationIngredient = createMockDataFactory<MedicationIngredient>(() => {
    return mockOptionalFields({
        amount: ratio(),
        isActive: faker.datatype.boolean(),
        itemCodeableConcept: codeableConcept(),
        itemReference: reference(),
    });
});
