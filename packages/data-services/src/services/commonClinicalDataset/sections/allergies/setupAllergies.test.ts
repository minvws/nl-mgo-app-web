import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getAllergies } = createCommonClinicalDatasetService({ prefixUrl: MOCK_SERVER_URL });

test('getAllergies', () => testRequestHandler(getAllergies, 'AllergyIntolerance'));
