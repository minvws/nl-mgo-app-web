import { faker } from '@faker-js/faker';
import { type Quantity } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code } from './code';

export const quantity = createMockDataFactory<Quantity>(() => {
    return {
        value: faker.number.float(),
        comparator: code(['<', '<=', '>=', '>'] as const),
        unit: faker.lorem.word(),
        system: faker.internet.url(),
        code: code(),
    };
});
