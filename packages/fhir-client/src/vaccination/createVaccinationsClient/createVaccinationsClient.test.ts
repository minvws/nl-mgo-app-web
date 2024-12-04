import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createVaccinationsClient } from './createVaccinationsClient';
import { FhirVersion } from '@minvws/mgo-fhir-data';

test('createVaccinationsClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createVaccinationsClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R4);
});
