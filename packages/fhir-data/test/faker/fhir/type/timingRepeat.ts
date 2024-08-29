import { faker } from '@faker-js/faker';
import { type TimingRepeat } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { collection, mockOptionalFields } from '../../helpers';
import { code } from './code';
import { duration } from './duration';
import { period } from './period';
import { dateTime } from './primitive';
import { range } from './range';

export const timingRepeat = createMockDataFactory<TimingRepeat>(() => {
    return mockOptionalFields({
        boundsDuration: duration(),
        boundsRange: range(),
        boundsPeriod: period(),
        count: faker.number.int(),
        countMax: faker.number.int(),
        duration: faker.number.int(),
        durationMax: faker.number.int(),
        durationUnit: code(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']),
        frequency: faker.number.int(),
        frequencyMax: faker.number.int(),
        period: faker.number.int(),
        periodMax: faker.number.int(),
        periodUnit: code(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']),
        timeOfDay: collection({
            factory: dateTime,
            max: 5,
        }),
        when: collection({
            factory: faker.lorem.word,
            max: 5,
        }),
    });
});
