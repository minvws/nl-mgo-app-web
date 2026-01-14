import { faker } from '@faker-js/faker';
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
        fhirVersion: faker.helpers.arrayElement(['R3', 'R4'] as const),
    } as MgoResource;
});
