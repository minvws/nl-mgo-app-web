import { type MedicationPackage } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { collection, mockOptionalFields } from '../../helpers';
import { codeableConcept } from '../type';
import { medicationPackageBatch } from './medicationPackageBatch';
import { medicationPackageContent } from './medicationPackageContent';

export const medicationPackage = createMockDataFactory<MedicationPackage>(() => {
    return mockOptionalFields({
        batch: collection({ max: 5, factory: medicationPackageBatch }),
        container: codeableConcept(),
        content: collection({ max: 5, factory: medicationPackageContent }),
    });
});
