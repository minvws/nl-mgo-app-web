import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type MedicationPackage } from 'fhir/r3';
import { codeableConcept } from '../type/index.js';
import { medicationPackageBatch } from './medicationPackageBatch.js';
import { medicationPackageContent } from './medicationPackageContent.js';

export const medicationPackage = createMockFactory<MedicationPackage>(() => {
    return {
        batch: mockArray({ min: 1, max: 5, factory: medicationPackageBatch }),
        container: codeableConcept(),
        content: mockArray({ min: 1, max: 5, factory: medicationPackageContent }),
    };
});
