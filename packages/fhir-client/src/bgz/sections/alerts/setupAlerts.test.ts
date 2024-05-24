import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getAlerts } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getAlerts', () => testRequestHandler(getAlerts, 'Flag'));
