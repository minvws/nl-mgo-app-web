import { type PractitionerQualification } from '@minvws/mgo-fhir/r4';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { codeableConcept, identifier, period, reference } from '../../fhirR3/type/index.js';

export const practitionerQualification = createMockFactory<PractitionerQualification>(() => {
    return {
        identifier: [identifier()],
        code: codeableConcept(),
        period: period(),
        issuer: reference(),
    } as PractitionerQualification;
});
