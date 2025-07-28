import { faker } from '@faker-js/faker';
import { type TimingRepeat } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { code } from './code.js';
import { dateTime } from './dateTime.js';
import { duration } from './duration.js';
import { period } from './period.js';
import { range } from './range.js';

export const timingRepeat = createMockFactory<TimingRepeat>(() => ({
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
    timeOfDay: mockArray({
        factory: dateTime,
        max: 5,
    }),
    when: mockArray({
        factory: faker.lorem.word,
        max: 5,
    }),
}));
