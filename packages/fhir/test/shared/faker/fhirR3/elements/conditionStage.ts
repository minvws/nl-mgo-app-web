import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type ConditionStage } from 'fhir/r3';
import { codeableConcept, coding, reference } from '../type/index.js';

export const conditionStage = createMockFactory<ConditionStage>(() => ({
    summary: codeableConcept({ coding: mockArray({ max: 1, factory: coding }) }),
    assessment: mockArray({ max: 5, factory: reference }),
}));
