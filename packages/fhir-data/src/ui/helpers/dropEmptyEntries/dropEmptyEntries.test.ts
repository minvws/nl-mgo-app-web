import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema, type UiElement } from '../../types';
import { dropEmptyEntries } from './dropEmptyEntries';

test('drops empty entries, but does not mutate the schema', () => {
    const entry1: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };
    const entry2: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: undefined,
    };
    const entry3: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };
    const entry4: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };

    const uiSchema: HealthUiSchema = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                children: [entry1, entry2, entry3, entry4],
            },
        ],
    };

    const expected = {
        label: uiSchema.label,
        children: [
            {
                label: uiSchema.children[0].label,
                children: [entry1, entry4],
            },
        ],
    };

    expect(dropEmptyEntries(uiSchema)).toEqual(expected);
    expect(uiSchema.children[0].children.length).toBe(4);
});

test('drops groups that are empty', () => {
    const entry2: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };
    const entry3: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };

    const uiSchema: HealthUiSchema = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                children: [],
            },
            {
                label: faker.lorem.word(),
                children: [entry2],
            },
            {
                label: faker.lorem.word(),
                children: [entry3],
            },
        ],
    };

    const expected = {
        label: uiSchema.label,
        children: [
            {
                label: uiSchema.children[1].label,
                children: [entry2],
            },
        ],
    };

    expect(dropEmptyEntries(uiSchema)).toEqual(expected);
});

test('drops groups that are empty for a group collection', () => {
    const entry2: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };
    const entry3: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };

    const uiSchemaGroups: HealthUiGroup[] = [
        {
            label: faker.lorem.word(),
            children: [],
        },
        {
            label: faker.lorem.word(),
            children: [entry2],
        },
        {
            label: faker.lorem.word(),
            children: [entry3],
        },
    ];

    const expected = [
        {
            label: uiSchemaGroups[1].label,
            children: [entry2],
        },
    ];

    expect(dropEmptyEntries(uiSchemaGroups)).toEqual(expected);
});

test('can drops empty entries for a single group but does not mutate the original', () => {
    const entry1: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };
    const entry2: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: undefined,
    };
    const entry3: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };
    const entry4: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
    };

    const uiSchemaGroup: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [entry1, entry2, entry3, entry4],
    };

    const expected = {
        label: uiSchemaGroup.label,
        children: [entry1, entry4],
    };

    expect(dropEmptyEntries(uiSchemaGroup)).toEqual(expected);
    expect(uiSchemaGroup.children.length).toBe(4);
});

test('returns an empty group if a groups was supplied with empty entries', () => {
    const entry1: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: undefined,
    };
    const entry2: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };

    const uiSchemaGroup: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [entry1, entry2],
    };

    const expected = {
        label: uiSchemaGroup.label,
        children: [],
    };

    expect(dropEmptyEntries(uiSchemaGroup)).toEqual(expected);
});
