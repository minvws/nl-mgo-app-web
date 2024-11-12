import { faker } from '@faker-js/faker';
import { type Quantity } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { code } from './code';

export const quantity = createMockDataFactory<Quantity>(() => {
    return mockOptionalFields({
        value: faker.number.float(),
        comparator: code(['<', '<=', '>=', '>']),
        unit: faker.lorem.word(),
        system: faker.internet.url(),
        code: code(),
    });
});
