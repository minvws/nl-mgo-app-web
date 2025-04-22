import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { boolean } from '../../type';
import { extensionMultiple } from './extensionMultiple';

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
    expect(value).toEqual([boolean(valueBoolean), boolean(valueBoolean), boolean(valueBoolean)]);
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
    expect(value).toEqual([boolean(valueBoolean), boolean(valueBoolean)]);
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
    expect(value).toEqual([boolean(valueBoolean), boolean(valueBoolean), boolean(valueBoolean)]);
});
