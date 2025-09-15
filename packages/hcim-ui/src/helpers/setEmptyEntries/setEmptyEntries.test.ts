import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema, type UiElement } from '../../types/index.js';
import { setEmptyEntries } from './setEmptyEntries.js';

test('sets empty entries, but does not mutate the schema', () => {
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
                children: [
                    entry1,
                    {
                        label: entry2.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    {
                        label: entry3.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    entry4,
                ],
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchema)).toEqual(expected);
    expect(uiSchema.children[0].children[2]).toBe(entry3);
});

test('works for all types - except DOWNLOAD_LINK & DOWNLOAD_BINARY', () => {
    const entry1: UiElement = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.word(),
        display: undefined,
    };
    const entry2: UiElement = {
        type: 'MULTIPLE_VALUES',
        label: faker.lorem.word(),
        display: [],
    };
    const entry3: UiElement = {
        type: 'MULTIPLE_GROUPED_VALUES',
        label: faker.lorem.word(),
        display: [[]],
    };
    const entry4: UiElement = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.word(),
        display: faker.lorem.word(),
        reference: undefined,
    };
    const entry5: UiElement = {
        type: 'DOWNLOAD_LINK',
        label: faker.lorem.word(),
        url: undefined as unknown as string,
    };
    const entry6: UiElement = {
        type: 'DOWNLOAD_BINARY',
        label: faker.lorem.word(),
        reference: undefined as unknown as string,
    };

    const uiSchema: HealthUiSchema = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                children: [entry1, entry2, entry3, entry4, entry5, entry6],
            },
        ],
    };

    const expected = {
        label: uiSchema.label,
        children: [
            {
                label: uiSchema.children[0].label,
                children: [
                    {
                        label: entry1.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    {
                        label: entry2.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    {
                        label: entry3.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    {
                        label: entry4.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(fhir.empty_value)',
                    },
                    entry5,
                    entry6,
                ],
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchema)).toEqual(expected);
});

test('also works for a group', () => {
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

    const uiSchemaGroup: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [entry1, entry2],
    };

    const expected = {
        label: uiSchemaGroup.label,
        children: [
            entry1,
            {
                label: entry2.label,
                type: 'SINGLE_VALUE',
                display: 'intl(fhir.empty_value)',
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchemaGroup)).toEqual(expected);
});

test('also works for a multiple groups', () => {
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

    const uiSchemaGroup: HealthUiGroup[] = [
        {
            label: faker.lorem.word(),
            children: [entry1, entry2],
        },
        {
            label: faker.lorem.word(),
            children: [entry2],
        },
    ];

    const expected = [
        {
            label: uiSchemaGroup[0].label,
            children: [
                entry1,
                {
                    label: entry2.label,
                    type: 'SINGLE_VALUE',
                    display: 'intl(fhir.empty_value)',
                },
            ],
        },
        {
            label: uiSchemaGroup[1].label,
            children: [
                {
                    label: entry2.label,
                    type: 'SINGLE_VALUE',
                    display: 'intl(fhir.empty_value)',
                },
            ],
        },
    ];

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchemaGroup)).toEqual(expected);
});
