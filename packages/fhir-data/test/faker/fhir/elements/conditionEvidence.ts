import { collection } from '$test/faker/helpers';
import { type ConditionEvidence } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, reference } from '../type';

export const conditionEvidence = createMockDataFactory<ConditionEvidence>(() => {
    return {
        code: collection({ max: 5, factory: codeableConcept }),
        detail: collection({ min: 1, max: 5, factory: reference }),
    };
});
