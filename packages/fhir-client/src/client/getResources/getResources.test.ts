import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createClient } from '../client';
import { resourceTypes } from '../fixtures/resourceTypes';

test('getResources returns a Bundle resource', async () => {
    const { getResources } = createClient({ prefixUrl: FHIR_API_URL });

    const resourceType = faker.helpers.arrayElement(resourceTypes);
    const resource = await getResources({ resource: resourceType }).json();

    expect(resource).toMatchObject({ resourceType: 'Bundle' });
});
