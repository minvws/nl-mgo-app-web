import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type HumanName } from 'fhir/r3';
import { code, period } from '../type';

export const humanName = createMockFactory<HumanName>(() => ({
    family: faker.lorem.word(),
    given: mockArray({ max: 5, factory: faker.lorem.word }),
    period: period(),
    prefix: mockArray({ max: 5, factory: faker.lorem.word }),
    suffix: mockArray({ max: 5, factory: faker.lorem.word }),
    text: faker.lorem.word(),
    use: code(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] as const),
}));
