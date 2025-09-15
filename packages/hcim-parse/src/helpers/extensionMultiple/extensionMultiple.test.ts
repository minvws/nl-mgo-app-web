import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { boolean } from '../../type/index.js';
import { customExtensionMultiple, extensionMultiple } from './extensionMultiple.js';

test('extensionMultiple returns empty array if no extensions are found', () => {
    const url = faker.internet.url();
    const input = {};

    const value = extensionMultiple(input, url, 'boolean');
    expect(value).toEqual([]);
});

test('extensionMultiple matched by url and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        extension: [
            { url, valueBoolean },
            { url, valueBoolean },
            { url, valueBoolean },
        ],
    };

    const value = extensionMultiple(input, url, 'boolean');
    expect(value).toEqual([
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
    ]);
});

test('extensionMultiple filters nonNullish values from the result', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        extension: [
            { url, valueBoolean },
            { url, valueBoolean: undefined },
            { url, valueBoolean },
        ],
    };

    const value = extensionMultiple(input, url, 'boolean');
    expect(value).toEqual([
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
    ]);
});

test('extensionMultiple also matches modifierExtentions and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        resourceType: faker.lorem.word(),
        extension: [
            { url, valueBoolean },
            { url, valueBoolean },
        ],
        modifierExtension: [{ url, valueBoolean }],
    };

    const value = extensionMultiple(input, url, 'boolean');
    expect(value).toEqual([
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
        {
            _ext: true,
            ...boolean(valueBoolean),
        },
    ]);
});

test('customExtensionMultiple uses provided parser function to transform values', () => {
    const url = faker.internet.url();
    const valueString = faker.lorem.word();
    const input = {
        extension: [
            { url, valueString },
            { url, valueString: undefined },
            { url, valueString },
        ],
    };

    const parser = (element: { valueString?: string }) => {
        if (element.valueString) {
            return { customField: element.valueString.toUpperCase() };
        }
        return undefined;
    };

    const value = customExtensionMultiple(input, url, parser);
    expect(value).toEqual([
        {
            _ext: true,
            customField: valueString.toUpperCase(),
        },
        {
            _ext: true,
            customField: valueString.toUpperCase(),
        },
    ]);
});
