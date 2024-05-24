import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getLastFunctionalOrMentalStatus } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getLastFunctionalOrMentalStatus', () =>
    testRequestHandler(getLastFunctionalOrMentalStatus, 'Observation/$lastn', {
        category: [
            'http://snomed.info/sct|11291000146105',
            'http://snomed.info/sct|384821006',
        ].join(','),
    }));
