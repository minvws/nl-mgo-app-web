import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { boolean } from '../../type';
import { extension } from './extension';

test('extension matched by url and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = { extension: [{ url, valueBoolean }] };

    const value = extension(input, url, 'boolean');
    expect(value).toEqual(boolean(valueBoolean));
});

test('extension also matches modifierExtentions and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        resourceType: faker.lorem.word(),
        modifierExtension: [{ url, valueBoolean }],
    };

    const value = extension(input, url, 'boolean');
    expect(value).toEqual(boolean(valueBoolean));
});
