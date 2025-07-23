import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type MedicationIngredient } from 'fhir/r3';
import { codeableConcept, ratio, reference } from '../type';

export const medicationIngredient = createMockFactory<MedicationIngredient>(() => {
    return {
        amount: ratio(),
        isActive: faker.datatype.boolean(),
        itemCodeableConcept: codeableConcept(),
        itemReference: reference(),
    };
});
