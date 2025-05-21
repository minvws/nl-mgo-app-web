import { test } from 'vitest';
import { createGeneralPractitionerService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getCompositions } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getCompositions', () =>
    testRequestHandler(getCompositions, 'Composition', {
        type: 'http://loinc.org|67781-5', // NOSONAR
    }));
