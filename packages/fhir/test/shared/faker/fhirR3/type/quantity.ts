import { faker } from '@faker-js/faker';
import { type Quantity } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code } from './code.js';

export const quantity = createMockFactory<Quantity>(() => {
    return {
        value: faker.number.float(),
        comparator: code(['<', '<=', '>=', '>'] as const),
        unit: faker.lorem.word(),
        system: faker.internet.url(),
        code: code(),
    };
});
