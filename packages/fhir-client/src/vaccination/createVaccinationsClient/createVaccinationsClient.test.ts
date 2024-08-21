import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createVaccinationsClient } from './createVaccinationsClient';

test('createVaccinationsClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance } = createVaccinationsClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
});
