import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createGpClient } from '../../createGpClient/createGpClient';

const { getPatient } = createGpClient({ prefixUrl: FHIR_API_URL });

test('getPatient', () =>
    testRequestHandler(getPatient, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));
