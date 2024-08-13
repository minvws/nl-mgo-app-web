import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createDocumentsClient } from './createDocumentsClient';

test('createDocumentsClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance } = createDocumentsClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
});
