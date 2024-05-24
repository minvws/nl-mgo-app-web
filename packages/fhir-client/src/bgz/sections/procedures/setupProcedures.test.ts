import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getSurgicalProcedures } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getSurgicalProcedures', () =>
    testRequestHandler(getSurgicalProcedures, 'Procedure', {
        category: 'http://snomed.info/sct|387713003',
    }));
