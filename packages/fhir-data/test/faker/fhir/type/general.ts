import { faker } from '@faker-js/faker';
import {
    type Annotation,
    type CodeableConcept,
    type Coding,
    type Duration,
    type Identifier,
    type Period,
    type Quantity,
    type Ratio,
} from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { mockOptionalFields } from '../helpers/mockOptionalFields';
import * as special from './special';
import { dateTime } from './primitive';

export function code<T extends string>(
    values: T[] = ['usual', 'official', 'temp', 'secondary'] as T[]
): T {
    return faker.helpers.arrayElement(values);
}

export const coding = createMockDataFactory<Coding>(() => {
    return mockOptionalFields({
        system: faker.internet.url(),
        version: `${faker.number.int(10)}`,
        display: faker.lorem.word(),
        code: faker.lorem.word().toLocaleUpperCase(),
    });
});

export const codableConcept = createMockDataFactory<CodeableConcept>(() => {
    return mockOptionalFields({
        coding: collection({ max: 5, factory: coding }),
        text: faker.lorem.sentence(),
    });
});

export const period = createMockDataFactory<Period>(() => {
    return mockOptionalFields({
        start: dateTime(),
        end: dateTime(),
    });
});

export const quantity = createMockDataFactory<Quantity>(() => {
    return mockOptionalFields({
        value: faker.number.float(),
        comparator: code(['<', '<=', '>=', '>']),
        unit: faker.lorem.word(),
        system: faker.internet.url(),
        code: code(),
    });
});

export const duration = createMockDataFactory<Duration>(quantity);

export const identifier = createMockDataFactory<Identifier>(() => {
    return mockOptionalFields({
        use: code(['usual', 'official', 'temp', 'secondary']),
        type: codableConcept(),
        system: faker.internet.url(),
        value: faker.lorem.word(),
        period: period(),
        assigner: special.reference(),
    });
});

export const ratio = createMockDataFactory<Ratio>(() => {
    return mockOptionalFields({
        numerator: quantity(),
        denominator: quantity(),
    });
});

export const annotation = createMockDataFactory<Annotation>(() => {
    return mockOptionalFields(
        {
            authorReference: special.reference(),
            authorString: faker.lorem.sentence(),
            text: faker.lorem.sentences(),
            time: dateTime(),
        },
        ['text']
    );
});
