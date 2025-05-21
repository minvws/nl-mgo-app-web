import { FhirVersion } from '@minvws/mgo-fhir-client';
import { expect, test } from 'vitest';
import { createCommonClinicalDatasetService } from '.';
import { MOCK_SERVER_URL } from '../../../test';

test('commonClinicalDatasetService exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createCommonClinicalDatasetService({
        prefixUrl: MOCK_SERVER_URL,
    });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R3);
});
