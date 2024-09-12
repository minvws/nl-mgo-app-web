import { type ConsentData } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { code, reference } from '../type';

export const consentData = createMockDataFactory<ConsentData>(() => {
    return {
        reference: reference(),
        meaning: code(['instance', 'related', 'dependents', 'authoredby']),
    };
});
