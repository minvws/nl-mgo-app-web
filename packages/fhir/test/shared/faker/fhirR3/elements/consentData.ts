import { type ConsentData } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code, reference } from '../type/index.js';

export const consentData = createMockFactory<ConsentData>(() => {
    return {
        reference: reference(),
        meaning: code(['instance', 'related', 'dependents', 'authoredby']),
    };
});
