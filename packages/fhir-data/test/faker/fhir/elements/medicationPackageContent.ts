import { type MedicationPackageContent } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, quantity, reference } from '../type';

export const medicationPackageContent = createMockDataFactory<MedicationPackageContent>(() => ({
    amount: quantity(),
    itemCodeableConcept: codeableConcept(),
    itemReference: reference(),
}));
