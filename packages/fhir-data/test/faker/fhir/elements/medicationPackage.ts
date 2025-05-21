import { type MedicationPackage } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { codeableConcept } from '../type';
import { medicationPackageBatch } from './medicationPackageBatch';
import { medicationPackageContent } from './medicationPackageContent';

export const medicationPackage = createMockDataFactory<MedicationPackage>(() => {
    return {
        batch: collection({ min: 1, max: 5, factory: medicationPackageBatch }),
        container: codeableConcept(),
        content: collection({ min: 1, max: 5, factory: medicationPackageContent }),
    };
});
