import { faker } from '$test';
import { expect, test } from 'vitest';
import { type UiElement, type UiSchema } from '../../types';
import { setEmptyEntries } from './setEmptyEntries';

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

    const uiSchema: UiSchema = {
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
                        display: 'intl(schema.empty_entry_display)',
                    },
                    {
                        label: entry3.label,
                        type: 'SINGLE_VALUE',
                        display: 'intl(schema.empty_entry_display)',
                    },
                    entry4,
                ],
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.custom.i18nContext());
    expect(uiSetEmptyEntries(uiSchema)).toEqual(expected);
    expect(uiSchema.children[0].children[2]).toBe(entry3);
});

test('works for all types', () => {
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

    const uiSchema: UiSchema = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                children: [entry1, entry2, entry3, entry4, entry5],
            },
        ],
    };

    const expected = {
        label: uiSchema.label,
        children: [
            {
                label: uiSchema.children[0].label,
                children: uiSchema.children[0].children.map((entry) => ({
                    label: entry.label,
                    type: 'SINGLE_VALUE',
                    display: 'intl(schema.empty_entry_display)',
                })),
            },
        ],
    };

    const uiSetEmptyEntries = setEmptyEntries(faker.custom.i18nContext());
    expect(uiSetEmptyEntries(uiSchema)).toEqual(expected);
});
