import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createBgzClient } from './createBgzClient';
import { FhirVersion } from '@minvws/mgo-fhir-data';

test('createBgzClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createBgzClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R3);
});
