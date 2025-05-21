import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getHospitalAdmissions } = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getHospitalAdmissions', () =>
    testRequestHandler(getHospitalAdmissions, 'Encounter', {
        class: [
            'http://hl7.org/fhir/v3/ActCode|IMP', // NOSONAR
            'http://hl7.org/fhir/v3/ActCode|ACUTE', // NOSONAR
            'http://hl7.org/fhir/v3/ActCode|NONAC', // NOSONAR
        ].join(','),
    }));
