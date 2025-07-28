import { type MedicationIngredient } from '@minvws/mgo-fhir/r4';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { ratio, reference } from '../../fhirR3/type/index.js';

export const medicationIngredient = createMockFactory<MedicationIngredient>(() => {
    return {
        itemReference: reference(),
        strength: ratio(),
    } as MedicationIngredient;
});
