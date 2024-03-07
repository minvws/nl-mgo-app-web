import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../test/server';
import { createClient } from './client';
import { faker } from '@faker-js/faker';
import { resourceTypes } from './fixtures/resourceTypes';

test('createClient exposes the `ky` instance for potential custom implementations', async () => {
    const { instance } = createClient({ prefixUrl: FHIR_API_URL });

    expect(typeof instance.get === 'function').toBe(true);
});

test('createClient configures losslessJson by default to prevent any loss in precision when parsing numbers', async () => {
    const { getResources } = createClient({ prefixUrl: FHIR_API_URL });

    const resourceType = faker.helpers.arrayElement(resourceTypes);
    const resource = await getResources({ resource: resourceType }).json();

    expect(resource.total?.isLosslessNumber).toBe(true);
});
