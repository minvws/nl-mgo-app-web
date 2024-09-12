import { type ConsentActor } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, reference } from '../type';

export const consentActor = createMockDataFactory<ConsentActor>(() => {
    return {
        reference: reference(),
        role: codeableConcept(),
    };
});
