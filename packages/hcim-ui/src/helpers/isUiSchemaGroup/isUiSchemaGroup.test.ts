import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema } from '../../types/index.js';
import { isUiSchemaGroup } from './isUiSchemaGroup.js';

test.each<[HealthUiSchema | HealthUiGroup, boolean]>([
    [{ label: faker.lorem.sentence(), children: [] }, false],
    [
        {
            label: faker.lorem.sentence(),
            children: [
                {
                    label: faker.lorem.sentence(),
                    children: [],
                },
            ],
        },
        false,
    ],
    [
        {
            label: faker.lorem.sentence(),
            children: [
                {
                    label: faker.lorem.sentence(),
                    children: [
                        {
                            type: 'SINGLE_VALUE',
                            label: faker.lorem.sentence(),
                            display: faker.lorem.sentence(),
                        },
                    ],
                },
            ],
        },
        false,
    ],
    [
        {
            label: faker.lorem.sentence(),
            children: [
                {
                    type: 'SINGLE_VALUE',
                    label: faker.lorem.sentence(),
                    display: faker.lorem.sentence(),
                },
            ],
        },
        true,
    ],
    [
        {
            label: faker.lorem.sentence(),
            children: [],
        },
        false,
    ],
])('determines if value is a UiSchemaGroup if it contains UiElements: %#', (value, expected) => {
    expect(isUiSchemaGroup(value)).toEqual(expected);
});
