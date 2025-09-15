import { type ConsentActor } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { codeableConcept, reference } from '../type/index.js';

export const consentActor = createMockFactory<ConsentActor>(() => {
    return {
        reference: reference(),
        role: codeableConcept(),
    };
});
