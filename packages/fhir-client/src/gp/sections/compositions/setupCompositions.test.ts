import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createGpClient } from '../../createGpClient/createGpClient';

const { getCompositions } = createGpClient({ prefixUrl: FHIR_API_URL });

test('getCompositions', () =>
    testRequestHandler(getCompositions, 'Composition', {
        type: 'https://loinc.org|67781-5',
    }));
