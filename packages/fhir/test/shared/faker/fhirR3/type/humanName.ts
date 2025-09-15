import { faker } from '@faker-js/faker';
import { type HumanName } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { code } from './code.js';
import { period } from './period.js';

export const humanName = createMockFactory<HumanName>(() => ({
    family: faker.lorem.word(),
    given: mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    period: period(),
    prefix: mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    suffix: mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    text: faker.lorem.word(),
    use: code(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] as const),
}));
