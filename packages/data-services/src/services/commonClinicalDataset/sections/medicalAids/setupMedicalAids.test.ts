import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getMedicalAids } = createCommonClinicalDatasetService({ prefixUrl: MOCK_SERVER_URL });

test('getMedicalDevice', () =>
    testRequestHandler(getMedicalAids, 'DeviceUseStatement', {
        _include: 'DeviceUseStatement:device',
    }));
