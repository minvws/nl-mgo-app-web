import { faker } from '@faker-js/faker';
import { type TimingRepeat } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { code } from './code';
import { dateTime } from './dateTime';
import { duration } from './duration';
import { period } from './period';
import { range } from './range';

export const timingRepeat = createMockDataFactory<TimingRepeat>(() => ({
    boundsDuration: duration(),
    boundsRange: range(),
    boundsPeriod: period(),
    count: faker.number.int(),
    countMax: faker.number.int(),
    duration: faker.number.int(),
    durationMax: faker.number.int(),
    durationUnit: code(['s', 'min', 'h', 'd', 'wk', 'mo', 'a'] as const),
    frequency: faker.number.int(),
    frequencyMax: faker.number.int(),
    period: faker.number.int(),
    periodMax: faker.number.int(),
    periodUnit: code(['s', 'min', 'h', 'd', 'wk', 'mo', 'a'] as const),
    timeOfDay: collection({
        factory: dateTime,
        max: 5,
    }),
    when: collection({
        factory: faker.lorem.word,
        max: 5,
    }),
}));
