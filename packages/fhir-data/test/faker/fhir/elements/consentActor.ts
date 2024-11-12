import { type ConsentActor } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, reference } from '../type';

export const consentActor = createMockDataFactory<ConsentActor>(() => {
    return {
        reference: reference(),
        role: codeableConcept(),
    };
});
