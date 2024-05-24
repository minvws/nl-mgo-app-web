import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getProblems } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getProblems', () => testRequestHandler(getProblems, 'Condition'));
