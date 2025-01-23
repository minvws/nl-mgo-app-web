import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getCurrentMedication } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getCurrentMedication', () =>
    testRequestHandler(getCurrentMedication, 'MedicationRequest', {
        _include: 'MedicationRequest:medication',
    }));
