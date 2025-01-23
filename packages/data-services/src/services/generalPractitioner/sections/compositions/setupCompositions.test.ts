import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getCompositions } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getCompositions', () =>
    testRequestHandler(getCompositions, 'Composition', {
        type: 'https://loinc.org|67781-5',
    }));
