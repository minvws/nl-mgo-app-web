import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getProblems } = createCommonClinicalDatasetService({ prefixUrl: MOCK_SERVER_URL });

test('getProblems', () => testRequestHandler(getProblems, 'Condition'));
