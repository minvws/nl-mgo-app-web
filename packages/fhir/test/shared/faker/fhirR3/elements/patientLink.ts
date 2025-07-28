import { type PatientLink } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code, reference } from '../type/index.js';

export const patientLink = createMockFactory<PatientLink>(() => {
    return {
        other: reference(),
        type: code(),
    };
});
