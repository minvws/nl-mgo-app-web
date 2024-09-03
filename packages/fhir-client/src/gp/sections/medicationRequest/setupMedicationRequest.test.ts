import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createGpClient } from '../../createGpClient/createGpClient';

const { getCurrentMedication } = createGpClient({ prefixUrl: FHIR_API_URL });

test('getCurrentMedication', () =>
    testRequestHandler(getCurrentMedication, 'MedicationRequest', {
        _include: 'MedicationRequest:medication',
    }));
