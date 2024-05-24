import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getInsuranceInformation } = createBgzClient({ prefixUrl: FHIR_API_URL });

test('getPaymentDetails', () =>
    testRequestHandler(getInsuranceInformation, 'Coverage', [
        ['_include', 'Coverage:payor:Patient'],
        ['_include', 'Coverage:payor:Organization'],
    ]));
