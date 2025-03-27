import { collection } from '$test/faker/helpers';
import { type ConditionStage } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, coding, reference } from '../type';

export const conditionStage = createMockDataFactory<ConditionStage>(() => ({
    summary: codeableConcept({ coding: collection({ max: 1, factory: coding }) }),
    assessment: collection({ max: 5, factory: reference }),
}));
