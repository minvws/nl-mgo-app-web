import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type PatientContact } from 'fhir/r3';
import { codeableConcept, period, reference } from '../type';
import { address } from './address';
import { contactPoint } from './contactPoint';
import { humanName } from './humanName';

export const patientContact = createMockFactory<PatientContact>(() => {
    return {
        relationship: mockArray({ max: 5, factory: codeableConcept }),
        name: humanName(),
        telecom: mockArray({ max: 5, factory: contactPoint }),
        address: address(),
        organization: reference(),
        period: period(),
    };
});
