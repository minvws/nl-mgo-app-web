import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../test/server';
import { createClient } from './client';

test('createClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance } = createClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
});
