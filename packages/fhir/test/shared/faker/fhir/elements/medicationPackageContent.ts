import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type MedicationPackageContent } from 'fhir/r3';
import { codeableConcept, quantity, reference } from '../type';

export const medicationPackageContent = createMockFactory<MedicationPackageContent>(() => ({
    amount: quantity(),
    itemCodeableConcept: codeableConcept(),
    itemReference: reference(),
}));
