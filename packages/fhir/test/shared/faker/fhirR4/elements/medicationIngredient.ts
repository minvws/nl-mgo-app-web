import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type MedicationIngredient } from 'fhir/r4';
import { ratio, reference } from '../../fhirR3/type/index.js';

export const medicationIngredient = createMockFactory<MedicationIngredient>(() => {
    return {
        itemReference: reference(),
        strength: ratio(),
    } as MedicationIngredient;
});
