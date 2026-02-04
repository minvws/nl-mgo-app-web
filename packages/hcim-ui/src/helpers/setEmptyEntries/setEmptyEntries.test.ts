import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema, type UiElement } from '../../types/index.js';
import { setEmptyEntries } from './setEmptyEntries.js';

test('sets empty entries, but does not mutate the schema', () => {
    const entry1: UiElement = faker.ui.singleValue();
    const entry2: UiElement = {
        ...faker.ui.singleValue(),
        value: undefined,
    };
    const entry3: UiElement = {
        ...faker.ui.referenceValue(),
        reference: undefined,
    };
    const entry4: UiElement = faker.ui.singleValue();

    const schemaLabel = faker.lorem.word();
    const childLabel = faker.lorem.word();
    const uiSchema: HealthUiSchema = {
        label: schemaLabel,
        children: [
            {
                id: childLabel,
                label: childLabel,
                children: [entry1, entry2, entry3, entry4],
            },
        ],
    };

    const expected: HealthUiSchema = {
        label: uiSchema.label,
        children: [
            {
                id: uiSchema.children[0].id,
                label: uiSchema.children[0].label,
                children: [
                    entry1,
                    {
                        id: entry2.id,
                        label: entry2.label,
                        type: 'SINGLE_VALUE',
                        value: { display: 'intl(fhir.empty_value)' },
                    },
                    entry3,
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
        ...faker.ui.singleValue(),
        value: undefined,
    };
    const entry2: UiElement = {
        ...faker.ui.multipleValues(),
        value: [],
    };
    const entry3: UiElement = {
        ...faker.ui.multipleGroupedValues(),
        value: [[]],
    };
    const entry4: UiElement = {
        ...faker.ui.referenceValue(),
        reference: undefined,
    };
    const entry5: UiElement = {
        ...faker.ui.downloadLink(),
        url: undefined as unknown as string,
    };
    const entry6: UiElement = {
        ...faker.ui.downloadBinary(),
        reference: undefined as unknown as string,
    };

    const schemaLabel = faker.lorem.word();
    const childLabel = faker.lorem.word();
    const uiSchema: HealthUiSchema = {
        label: schemaLabel,
        children: [
            {
                id: childLabel,
                label: childLabel,
                children: [entry1, entry2, entry3, entry4, entry5, entry6],
            },
        ],
    };

    const expected: HealthUiSchema = {
        label: uiSchema.label,
        children: [
            {
                id: uiSchema.children[0].id,
                label: uiSchema.children[0].label,
                children: [
                    {
                        id: entry1.id,
                        label: entry1.label,
                        type: 'SINGLE_VALUE',
                        value: { display: 'intl(fhir.empty_value)' },
                    },
                    {
                        id: entry2.id,
                        label: entry2.label,
                        type: 'SINGLE_VALUE',
                        value: { display: 'intl(fhir.empty_value)' },
                    },
                    {
                        id: entry3.id,
                        label: entry3.label,
                        type: 'SINGLE_VALUE',
                        value: { display: 'intl(fhir.empty_value)' },
                    },
                    entry4,
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
    const entry1: UiElement = faker.ui.singleValue();
    const entry2: UiElement = {
        ...faker.ui.singleValue(),
        value: undefined,
    };

    const groupLabel = faker.lorem.word();
    const uiSchemaGroup: HealthUiGroup = {
        id: groupLabel,
        label: groupLabel,
        children: [entry1, entry2],
    };

    const expected: HealthUiGroup = {
        id: uiSchemaGroup.id,
        label: uiSchemaGroup.label,
        children: [
            entry1,
            {
                id: entry2.id,
                label: entry2.label,
                type: 'SINGLE_VALUE',
                value: { display: 'intl(fhir.empty_value)' },
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchemaGroup)).toEqual(expected);
});

test('also works for a multiple groups', () => {
    const entry1: UiElement = faker.ui.singleValue();
    const entry2: UiElement = {
        ...faker.ui.singleValue(),
        value: undefined,
    };

    const group1Label = faker.lorem.word();
    const group2Label = faker.lorem.word();
    const uiSchemaGroup: HealthUiGroup[] = [
        {
            id: group1Label,
            label: group1Label,
            children: [entry1, entry2],
        },
        {
            id: group2Label,
            label: group2Label,
            children: [entry2],
        },
    ];

    const expected: HealthUiGroup[] = [
        {
            id: uiSchemaGroup[0].id,
            label: uiSchemaGroup[0].label!,
            children: [
                entry1,
                {
                    id: entry2.id,
                    label: entry2.label,
                    type: 'SINGLE_VALUE',
                    value: { display: 'intl(fhir.empty_value)' },
                },
            ],
        },
        {
            id: uiSchemaGroup[1].id,
            label: uiSchemaGroup[1].label,
            children: [
                {
                    id: entry2.id,
                    label: entry2.label,
                    type: 'SINGLE_VALUE',
                    value: { display: 'intl(fhir.empty_value)' },
                },
            ],
        },
    ];

    const uiSetEmptyEntries = setEmptyEntries(faker.ui.context());
    expect(uiSetEmptyEntries(uiSchemaGroup)).toEqual(expected);
});
