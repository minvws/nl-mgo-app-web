import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type PatientLink } from 'fhir/r3';
import { code, reference } from '../type';

export const patientLink = createMockFactory<PatientLink>(() => {
    return {
        other: reference(),
        type: code(),
    };
});
