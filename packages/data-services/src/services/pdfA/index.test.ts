import { expect, test } from 'vitest';
import { MOCK_SERVER_URL } from '../../../test/server';
import { createPdfAService } from '.';
import { FhirVersion } from '@minvws/mgo-fhir-client';

test('createDocumentsClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance, fhirVersion } = createPdfAService({ prefixUrl: MOCK_SERVER_URL });

    expect(typeof instance.get === 'function').toBe(true);
    expect(fhirVersion).toEqual(FhirVersion.R3);
});
