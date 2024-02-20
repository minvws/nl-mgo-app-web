import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../../test/server';
import { createClient } from '../client';
import { resourceTypes } from '../fixtures/resourceTypes';

test('getResource returns a resource', async () => {
    const { getResource } = createClient({ prefixUrl: FHIR_API_URL });

    const resourceType = faker.helpers.arrayElement(resourceTypes);
    const id = faker.string.uuid();
    const resource = await getResource({ resource: resourceType, id }).json();

    expect(resource).toMatchObject({
        resourceType,
        id,
    });
});
