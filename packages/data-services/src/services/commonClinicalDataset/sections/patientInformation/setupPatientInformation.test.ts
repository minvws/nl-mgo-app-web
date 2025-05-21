import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getPatientInformation } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getPatientInformation', () =>
    testRequestHandler(getPatientInformation, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));
