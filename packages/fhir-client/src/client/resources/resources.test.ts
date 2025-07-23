import { faker } from '@faker-js/faker';
import { FhirVersion, type ResourceType } from '@minvws/mgo-fhir';
import { expect, test } from 'vitest';
import { createClient } from '..';
import { FHIR_API_URL } from '../../../test/server';

test('getResources returns a Bundle resource', async () => {
    const fhirVersion = faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
    const { getResources } = createClient({ prefixUrl: FHIR_API_URL, fhirVersion });

    const resourceType = faker.lorem.word() as ResourceType;
    const resource = await getResources({ resource: resourceType }).json();

    expect(resource).toMatchObject({ resourceType: 'Bundle' });
});
