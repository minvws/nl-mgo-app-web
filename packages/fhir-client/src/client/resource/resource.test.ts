import { faker } from '@faker-js/faker';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type ResourceType } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { createClient } from '..';
import { FHIR_API_URL } from '../../../test/server';

test('getResource returns a resource', async () => {
    const fhirVersion = faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
    const { getResource } = createClient({ prefixUrl: FHIR_API_URL, fhirVersion });

    const resourceType = faker.lorem.word() as ResourceType;
    const id = faker.string.uuid();
    const resource = await getResource({ resource: resourceType, id }).json();

    expect(resource).toMatchObject({
        resourceType,
        id,
    });
});
