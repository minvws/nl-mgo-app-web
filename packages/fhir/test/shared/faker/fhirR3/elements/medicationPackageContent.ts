import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type MedicationPackageContent } from 'fhir/r3';
import { codeableConcept, quantity, reference } from '../type/index.js';

export const medicationPackageContent = createMockFactory<MedicationPackageContent>(() => ({
    amount: quantity(),
    itemCodeableConcept: codeableConcept(),
    itemReference: reference(),
}));
