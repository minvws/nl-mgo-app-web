import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getVaccinations } = createCommonClinicalDatasetService({ prefixUrl: MOCK_SERVER_URL });

test('getVaccinations', () =>
    testRequestHandler(getVaccinations, 'Immunization', {
        status: 'completed',
    }));
