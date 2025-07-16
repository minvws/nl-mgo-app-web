import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Quantity } from 'fhir/r3';
import { code } from './code';

export const quantity = createMockFactory<Quantity>(() => {
    return {
        value: faker.number.float(),
        comparator: code(['<', '<=', '>=', '>'] as const),
        unit: faker.lorem.word(),
        system: faker.internet.url(),
        code: code(),
    };
});
