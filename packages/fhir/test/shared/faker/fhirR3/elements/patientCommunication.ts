import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type PatientCommunication } from 'fhir/r3';
import { codeableConcept, coding } from '../type/index.js';

export const patientCommunication = createMockFactory<PatientCommunication>(() => {
    return {
        language: codeableConcept({ coding: mockArray({ min: 1, max: 5, factory: coding }) }),
        preferred: faker.datatype.boolean(),
    };
});
