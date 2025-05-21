import { type MedicationIngredient } from 'fhir/r4';
import { createMockDataFactory } from '../../factory';
import { ratio, reference } from '../../fhir/type';

export const medicationIngredient = createMockDataFactory<MedicationIngredient>(() => {
    return {
        itemReference: reference(),
        strength: ratio(),
    } as MedicationIngredient;
});
