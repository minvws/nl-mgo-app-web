import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const { getInsuranceInformation } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getPaymentDetails', () =>
    testRequestHandler(getInsuranceInformation, 'Coverage', [
        ['_include', 'Coverage:payor:Patient'],
        ['_include', 'Coverage:payor:Organization'],
    ]));
