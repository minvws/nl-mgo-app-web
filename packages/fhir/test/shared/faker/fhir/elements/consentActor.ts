import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type ConsentActor } from 'fhir/r3';
import { codeableConcept, reference } from '../type';

export const consentActor = createMockFactory<ConsentActor>(() => {
    return {
        reference: reference(),
        role: codeableConcept(),
    };
});
