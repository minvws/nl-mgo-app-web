import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createGpClient } from '../../createGpClient/createGpClient';

const { getMedicationIntolerance } = createGpClient({ prefixUrl: FHIR_API_URL });

test('getMedicationIntolerance', () =>
    testRequestHandler(getMedicationIntolerance, 'AllergyIntolerance', {
        category: 'medication',
    }));
