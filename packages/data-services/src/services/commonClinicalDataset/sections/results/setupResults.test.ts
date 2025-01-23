import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getLastLaboratoryResultsPerType } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getLastLaboratoryResultsPerType', () =>
    testRequestHandler(getLastLaboratoryResultsPerType, 'Observation/$lastn', [
        ['category', 'http://snomed.info/sct|275711006'], // NOSONAR
        ['_include', 'Observation:related-target'],
        ['_include', 'Observation:specimen'],
    ]));
