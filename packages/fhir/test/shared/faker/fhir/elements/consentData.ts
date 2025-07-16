import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type ConsentData } from 'fhir/r3';
import { code, reference } from '../type';

export const consentData = createMockFactory<ConsentData>(() => {
    return {
        reference: reference(),
        meaning: code(['instance', 'related', 'dependents', 'authoredby']),
    };
});
