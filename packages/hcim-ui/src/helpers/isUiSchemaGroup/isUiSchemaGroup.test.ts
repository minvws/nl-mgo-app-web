import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema } from '../../types/index.js';
import { isUiSchemaGroup } from './isUiSchemaGroup.js';

test.each<[HealthUiSchema | HealthUiGroup, boolean]>([
    [{ id: faker.string.uuid(), label: faker.lorem.sentence(), children: [] }, false],
    [
        {
            id: faker.string.uuid(),
            label: faker.lorem.sentence(),
            children: [
                {
                    id: faker.string.uuid(),
                    label: faker.lorem.sentence(),
                    children: [],
                },
            ],
        },
        false,
    ],
    [
        {
            id: faker.string.uuid(),
            label: faker.lorem.sentence(),
            children: [
                {
                    id: faker.string.uuid(),
                    label: faker.lorem.sentence(),
                    children: [
                        {
                            id: faker.string.uuid(),
                            type: 'SINGLE_VALUE',
                            label: faker.lorem.sentence(),
                            value: { display: faker.lorem.sentence() },
                        },
                    ],
                },
            ],
        },
        false,
    ],
    [
        {
            id: faker.string.uuid(),
            label: faker.lorem.sentence(),
            children: [
                {
                    id: faker.string.uuid(),
                    type: 'SINGLE_VALUE',
                    label: faker.lorem.sentence(),
                    value: { display: faker.lorem.sentence() },
                },
            ],
        },
        true,
    ],
    [
        {
            id: faker.string.uuid(),
            label: faker.lorem.sentence(),
            children: [],
        },
        false,
    ],
])('determines if value is a UiSchemaGroup if it contains UiElements: %#', (value, expected) => {
    expect(isUiSchemaGroup(value)).toEqual(expected);
});
