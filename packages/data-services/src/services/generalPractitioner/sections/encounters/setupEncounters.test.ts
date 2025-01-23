import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getEncounters } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getEncounters', () => testRequestHandler(getEncounters, 'Encounter'));
