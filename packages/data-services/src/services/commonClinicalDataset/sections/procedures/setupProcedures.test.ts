import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getSurgicalProcedures } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getSurgicalProcedures', () =>
    testRequestHandler(getSurgicalProcedures, 'Procedure', {
        category: 'http://snomed.info/sct|387713003', // NOSONAR
    }));
