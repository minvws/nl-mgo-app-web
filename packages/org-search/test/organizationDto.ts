import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { OrganizationItemDto } from '../src/search/normalize.js';

export const organizationDto = createMockFactory<OrganizationItemDto>(() => ({
    id: faker.string.uuid(),
    display_name: faker.lorem.word(),
    aliases: mockArray({ max: 5, factory: faker.lorem.word }),
    care_type_display: faker.lorem.word(),
    city: faker.lorem.word(),
    postal_code: faker.lorem.word(),
    address_line: faker.lorem.word(),
    geo_lat: faker.number.float({ min: 50.75, max: 53.7 }),
    geo_lng: faker.number.float({ min: 3.2, max: 7.23 }),
    normalized_name: faker.lorem.word(),
    normalized_aliases: mockArray({ max: 5, factory: faker.lorem.word }),
    normalized_types: mockArray({ max: 5, factory: faker.lorem.word }),
    qps_search_blob: faker.lorem.word(),
}));
