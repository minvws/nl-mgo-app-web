import { type PatientLink } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { code, reference } from '../type';

export const patientLink = createMockDataFactory<PatientLink>(() => {
    return {
        other: reference(),
        type: code(),
    };
});
