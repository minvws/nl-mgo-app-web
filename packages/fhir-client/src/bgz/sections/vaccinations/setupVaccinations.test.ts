import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getVaccinations } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getVaccinations', () =>
    testRequestHandler(getVaccinations, 'Immunization', {
        status: 'completed',
    }));
