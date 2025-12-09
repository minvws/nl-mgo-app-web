import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import type { OrganizationItem } from '../src/index.js';

export const organization = createMockFactory<OrganizationItem>(() => ({
    id: faker.string.uuid(),
    displayName: faker.lorem.word(),
    legalName: faker.lorem.word(),
    aliases: mockArray({ max: 5, factory: faker.lorem.word }),
    careTypeDisplay: faker.lorem.word(),
    city: faker.lorem.word(),
    postalCode: faker.lorem.word(),
    addressLine: faker.lorem.word(),
    geoLat: faker.number.float({ min: 50.75, max: 53.7 }),
    geoLng: faker.number.float({ min: 3.2, max: 7.23 }),
}));
