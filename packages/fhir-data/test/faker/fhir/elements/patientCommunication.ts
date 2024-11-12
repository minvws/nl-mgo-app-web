import { faker } from '@faker-js/faker';
import { type PatientCommunication } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, coding } from '../type';
import { collection } from '$test/faker/helpers';

export const patientCommunication = createMockDataFactory<PatientCommunication>(() => {
    return {
        language: codeableConcept({ coding: collection({ min: 1, max: 5, factory: coding }) }),
        preferred: faker.datatype.boolean(),
    };
});
