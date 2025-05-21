import { faker } from '@faker-js/faker';
import { type HumanName } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { code, period } from '../type';

export const humanName = createMockDataFactory<HumanName>(() => ({
    family: faker.lorem.word(),
    given: collection({ max: 5, factory: faker.lorem.word }),
    period: period(),
    prefix: collection({ max: 5, factory: faker.lorem.word }),
    suffix: collection({ max: 5, factory: faker.lorem.word }),
    text: faker.lorem.word(),
    use: code(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] as const),
}));
