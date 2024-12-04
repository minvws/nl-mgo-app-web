import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createGpClient } from './createGpClient';
import { FhirVersion } from '@minvws/mgo-fhir-data';

test('createGpClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createGpClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R3);
});
