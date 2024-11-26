import { type PractitionerQualification } from 'fhir/r4';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, identifier, period, reference } from '../../fhir/type';

export const practitionerQualification = createMockDataFactory<PractitionerQualification>(() => {
    return {
        identifier: [identifier()],
        code: codeableConcept(),
        period: period(),
        issuer: reference(),
    } as PractitionerQualification;
});
