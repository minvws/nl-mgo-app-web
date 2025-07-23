import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type ConditionEvidence } from 'fhir/r3';
import { codeableConcept, reference } from '../type/index.js';

export const conditionEvidence = createMockFactory<ConditionEvidence>(() => {
    return {
        code: mockArray({ max: 5, factory: codeableConcept }),
        detail: mockArray({ min: 1, max: 5, factory: reference }),
    };
});
