import { faker } from '@faker-js/faker';
import { type Address } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { code, period } from '../type';

export const address = createMockDataFactory<Address>(() => ({
    use: code(['home', 'work', 'temp', 'old'] as const),
    type: code(['postal', 'physical', 'both'] as const),
    text: faker.lorem.word(),
    line: collection({ max: 5, factory: faker.lorem.word }),
    city: faker.location.city(),
    district: faker.location.county(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    period: period(),
}));
