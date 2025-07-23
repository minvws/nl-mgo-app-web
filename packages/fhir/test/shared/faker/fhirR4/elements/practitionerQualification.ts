import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type PractitionerQualification } from 'fhir/r4';
import { codeableConcept, identifier, period, reference } from '../../fhirR3/type/index.js';

export const practitionerQualification = createMockFactory<PractitionerQualification>(() => {
    return {
        identifier: [identifier()],
        code: codeableConcept(),
        period: period(),
        issuer: reference(),
    } as PractitionerQualification;
});
