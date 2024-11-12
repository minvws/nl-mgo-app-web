import { type MedicationPackageContent } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { codeableConcept, quantity, reference } from '../type';

export const medicationPackageContent = createMockDataFactory<MedicationPackageContent>(() => {
    return mockOptionalFields({
        amount: quantity(),
        itemCodeableConcept: codeableConcept(),
        itemReference: reference(),
    });
});
