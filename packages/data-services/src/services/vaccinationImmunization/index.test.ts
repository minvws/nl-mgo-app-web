import { expect, test } from 'vitest';
import { MOCK_SERVER_URL } from '../../../test/server';
import { createVaccinationImmunizationService } from '.';
import { FhirVersion } from '@minvws/mgo-fhir-client';

test('createVaccinationsClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createVaccinationImmunizationService({
        prefixUrl: MOCK_SERVER_URL,
    });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R4);
});
