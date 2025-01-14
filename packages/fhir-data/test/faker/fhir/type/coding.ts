import { faker } from '@faker-js/faker';
import { type Coding } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';

export const coding = createMockDataFactory<Coding>(() => {
    return {
        system: faker.internet.url(),
        version: `${faker.number.int(10)}`,
        display: faker.lorem.word(),
        code: faker.lorem.word().toLocaleUpperCase(),
    };
});
