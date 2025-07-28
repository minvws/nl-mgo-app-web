import { type MedicationPackage } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
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
