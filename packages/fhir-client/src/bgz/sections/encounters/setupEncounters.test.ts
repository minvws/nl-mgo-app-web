import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getHospitalAdmissions } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getHospitalAdmissions', () =>
    testRequestHandler(getHospitalAdmissions, 'Encounter', {
        class: [
            'http://hl7.org/fhir/v3/ActCode|IMP',
            'http://hl7.org/fhir/v3/ActCode|ACUTE',
            'http://hl7.org/fhir/v3/ActCode|NONAC',
        ].join(','),
    }));
