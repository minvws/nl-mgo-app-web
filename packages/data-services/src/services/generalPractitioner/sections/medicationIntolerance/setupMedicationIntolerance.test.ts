import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getMedicationIntolerance } = createGeneralPractitionerService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getMedicationIntolerance', () =>
    testRequestHandler(getMedicationIntolerance, 'AllergyIntolerance', {
        category: 'medication',
    }));
