import { expect, test } from 'vitest';
import { isMultipleValue } from './isMultipleValue';
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
            display: [[faker.lorem.word()], [faker.lorem.word()]],
            type: faker.lorem.word(),
        },
    ],
    [
        false,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
            reference: undefined,
        },
    ],
    [
        false,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
            reference: faker.lorem.word(),
        },
    ],
    [
        false,
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
        },
    ],
    [
        true,
        {
            label: faker.lorem.word(),
            display: [faker.lorem.word()],
            type: faker.lorem.word(),
        },
    ],
])('isMultipleValue returns: %j for %j', (expectedResult, value) => {
    const result = isMultipleValue(value);
    expect(result).toEqual(expectedResult);
});
