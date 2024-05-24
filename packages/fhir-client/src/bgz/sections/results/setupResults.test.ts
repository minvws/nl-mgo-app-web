import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getLastLaboratoryResultsPerType } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getLastLaboratoryResultsPerType', () =>
    testRequestHandler(getLastLaboratoryResultsPerType, 'Observation/$lastn', [
        ['category', 'http://snomed.info/sct|275711006'],
        ['_include', 'Observation:related-target'],
        ['_include', 'Observation:specimen'],
    ]));
