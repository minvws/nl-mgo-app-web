import { faker } from '@faker-js/faker';
import { FhirVersion, type ResourceType } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { FHIR_API_URL } from '../../test/server';
import { createClient } from '.';

test('fhirClient exposes the `ky` instance for potential custom implementations', async () => {
    const fhirVersion = faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
    const { instance } = createClient({ prefixUrl: FHIR_API_URL, fhirVersion });

    expect(typeof instance.get === 'function').toBe(true);
});

test('fhirClient configures losslessJson by default to prevent any loss in precision when parsing numbers', async () => {
    const fhirVersion = faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
    const { getResources } = createClient({ prefixUrl: FHIR_API_URL, fhirVersion });

    const resourceType = faker.lorem.word() as ResourceType;
    const resource = await getResources({ resource: resourceType }).json();

    expect(resource.total?.isLosslessNumber).toBe(true);
});
