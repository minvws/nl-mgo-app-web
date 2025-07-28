import { faker } from '$test';
import { expect, test } from 'vitest';
import { type UiElement } from '../../types/index.js';
import { isUiEntry } from './isUiEntry.js';

test.each<[boolean, UiElement['type'], UiElement]>([
    [
        true,
        'SINGLE_VALUE',
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: 'SINGLE_VALUE',
        },
    ],
    [
        false,
        'SINGLE_VALUE',
        {
            label: faker.lorem.word(),
            display: faker.lorem.word(),
            type: faker.lorem.word(),
        } as UiElement,
    ],
    [
        true,
        'DOWNLOAD_LINK',
        {
            label: faker.lorem.word(),
            url: faker.lorem.word(),
            type: 'DOWNLOAD_LINK',
        },
    ],
    [
        false,
        'DOWNLOAD_LINK',
        {
            label: faker.lorem.word(),
            url: faker.lorem.word(),
            type: faker.lorem.word(),
        } as UiElement,
    ],
])('isUiEntry returns: %j for type %j with value %j', (expectedResult, type, value) => {
    const result = isUiEntry(value, type);
    expect(result).toEqual(expectedResult);
});
