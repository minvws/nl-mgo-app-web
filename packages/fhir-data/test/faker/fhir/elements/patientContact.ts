import { collection } from '$test/faker/helpers';
import { type PatientContact } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, period, reference } from '../type';
import { address } from './address';
import { contactPoint } from './contactPoint';
import { humanName } from './humanName';

export const patientContact = createMockDataFactory<PatientContact>(() => {
    return {
        relationship: collection({ max: 5, factory: codeableConcept }),
        name: humanName(),
        telecom: collection({ max: 5, factory: contactPoint }),
        address: address(),
        organization: reference(),
        period: period(),
    };
});
