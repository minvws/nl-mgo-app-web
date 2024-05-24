import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getAllergies } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getAllergies', () => testRequestHandler(getAllergies, 'AllergyIntolerance'));
