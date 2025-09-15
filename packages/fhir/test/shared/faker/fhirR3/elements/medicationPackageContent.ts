import { type MedicationPackageContent } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { codeableConcept, quantity, reference } from '../type/index.js';

export const medicationPackageContent = createMockFactory<MedicationPackageContent>(() => ({
    amount: quantity(),
    itemCodeableConcept: codeableConcept(),
    itemReference: reference(),
}));
