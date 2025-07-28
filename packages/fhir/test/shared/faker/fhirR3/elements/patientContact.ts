import { type PatientContact } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { codeableConcept, period, reference } from '../type/index.js';
import { address } from './address.js';
import { contactPoint } from './contactPoint.js';
import { humanName } from './humanName.js';

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
