import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { OrganizationDto } from '../src/search/schema.js';

export const organizationDto = createMockFactory<OrganizationDto>(() => ({
    id: faker.string.uuid(),
    medmij_id: faker.string.uuid(),
    name: faker.lorem.word(),
    care_type: faker.lorem.word(),
    city: faker.lorem.word(),
    postal_code: faker.lorem.word(),
    address: faker.lorem.word(),
    geo_lat: faker.number.float({ min: 50.75, max: 53.7 }),
    geo_lng: faker.number.float({ min: 3.2, max: 7.23 }),
    search_blob: faker.lorem.word(),
}));
