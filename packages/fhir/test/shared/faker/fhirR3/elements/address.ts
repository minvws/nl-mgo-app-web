import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type Address } from 'fhir/r3';
import { code, period } from '../type/index.js';

export const address = createMockFactory<Address>(() => ({
    use: code(['home', 'work', 'temp', 'old'] as const),
    type: code(['postal', 'physical', 'both'] as const),
    text: faker.lorem.word(),
    line: mockArray({ max: 5, factory: faker.lorem.word }),
    city: faker.location.city(),
    district: faker.location.county(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    period: period(),
}));
