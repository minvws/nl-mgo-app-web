import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getTreatmentDirectives, getAdvanceDirectives } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getTreatmentDirectives', () =>
    testRequestHandler(getTreatmentDirectives, 'Consent', {
        category: 'http://snomed.info/sct|11291000146105', // NOSONAR
    }));

test('getAdvanceDirectives', () =>
    testRequestHandler(getAdvanceDirectives, 'Consent', {
        category: 'http://snomed.info/sct|11341000146107', // NOSONAR
    }));
