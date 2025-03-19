import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getLastFunctionalOrMentalStatus } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getLastFunctionalOrMentalStatus', () =>
    testRequestHandler(getLastFunctionalOrMentalStatus, 'Observation/$lastn', {
        category: [
            'http://snomed.info/sct|118228005', // NOSONAR
            'http://snomed.info/sct|384821006', // NOSONAR
        ].join(','),
    }));
