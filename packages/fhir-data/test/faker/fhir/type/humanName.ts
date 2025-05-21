import { faker } from '@faker-js/faker';
import { type HumanName } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { code } from './code';
import { period } from './period';

export const humanName = createMockDataFactory<HumanName>(() => ({
    family: faker.lorem.word(),
    given: collection({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    period: period(),
    prefix: collection({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    suffix: collection({
        factory: faker.lorem.word,
        min: 1,
        max: 5,
    }),
    text: faker.lorem.word(),
    use: code(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] as const),
}));
