import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getAlerts } = createCommonClinicalDatasetService({ prefixUrl: MOCK_SERVER_URL });

test('getAlerts', () => testRequestHandler(getAlerts, 'Flag'));
