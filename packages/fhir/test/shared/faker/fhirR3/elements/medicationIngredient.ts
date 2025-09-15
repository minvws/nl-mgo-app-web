import { faker } from '@faker-js/faker';
import { type MedicationIngredient } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { codeableConcept, ratio, reference } from '../type/index.js';

export const medicationIngredient = createMockFactory<MedicationIngredient>(() => {
    return {
        amount: ratio(),
        isActive: faker.datatype.boolean(),
        itemCodeableConcept: codeableConcept(),
        itemReference: reference(),
    };
});
