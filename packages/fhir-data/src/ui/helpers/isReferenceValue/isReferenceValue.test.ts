import { expect, test } from 'vitest';
import { isReferenceValue } from './isReferenceValue';
import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';
import { faker } from '$test';

test.each<[boolean, SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue]>([
    [
        false,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
        },
    ],
    [
        false,
        {
            label: faker.lorem.word(),
            display: [faker.lorem.word()],
            type: faker.lorem.word(),
        },
    ],
    [
        false,
        {
            label: faker.lorem.word(),
            display: [[faker.lorem.word()], [faker.lorem.word()]],
            type: faker.lorem.word(),
        },
    ],
    [
        true,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
            reference: undefined,
        },
    ],
    [
        true,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
            reference: faker.lorem.word(),
        },
    ],
])('isReferenceValue returns: %j for %j', (expectedResult, value) => {
    const result = isReferenceValue(value);
    expect(result).toEqual(expectedResult);
});
