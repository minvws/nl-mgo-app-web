import { faker } from '@faker-js/faker';
import { FhirVersion } from '@minvws/mgo-fhir';
import { MgoResource } from '@minvws/mgo-hcim';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

export const mgoResource = createMockFactory<MgoResource>(() => {
    const resourceType = faker.lorem.word();
    const id = faker.string.uuid();
    return {
        id,
        resourceType,
        referenceId: `${resourceType}/${id}`,
        profile: faker.internet.url(),
        fhirVersion: faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]),
    } as MgoResource;
});
