import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getPatient } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getPatient', () =>
    testRequestHandler(getPatient, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));
