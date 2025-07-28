import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { boolean, string } from '../../type/index.js';
import { customExtension, extension } from './extension.js';

test('extension matched by url and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = { extension: [{ url, valueBoolean }] };

    const value = extension(input, url, 'boolean');
    expect(value).toEqual({
        _ext: true,
        ...boolean(valueBoolean),
    });
});

test('extension also matches modifierExtentions and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        resourceType: faker.lorem.word(),
        modifierExtension: [{ url, valueBoolean }],
    };

    const value = extension(input, url, 'boolean');
    expect(value).toEqual({
        _ext: true,
        ...boolean(valueBoolean),
    });
});

test('if value is empty it returns undefined', () => {
    const url = faker.internet.url();
    const input = { extension: [{ url }] };
    const value = extension(input, url, 'boolean');
    expect(value).toBeUndefined();
});

test('customExtension parses extension with custom parser', () => {
    const url = faker.internet.url();
    const valueString = faker.string.sample();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        extension: [
            {
                url,
                extension: [
                    { url: 'name', valueString },
                    { url: 'isActive', valueBoolean },
                ],
            },
        ],
    };

    const value = customExtension(input, url, (element) => {
        return {
            name: extension(element, 'name', 'string'),
            isActive: extension(element, 'isActive', 'boolean'),
        };
    });

    expect(value).toEqual({
        _ext: true,
        name: {
            _ext: true,
            ...string(valueString),
        },
        isActive: {
            _ext: true,
            ...boolean(valueBoolean),
        },
    });
});
