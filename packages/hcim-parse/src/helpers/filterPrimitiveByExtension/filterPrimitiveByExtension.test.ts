import { faker } from '$test';
import { type HumanName as HumanNameR3 } from 'fhir/r3';
import { expect, test } from 'vitest';
import { filterPrimitiveByExtension } from './filterPrimitiveByExtension';

test('filterPrimitiveByExtension returns undefined if the extension does not exist', () => {
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
        _text: {
            id: faker.string.uuid(),
        },
    };

    const value = filterPrimitiveByExtension(data, 'text', {
        url: faker.internet.url(),
    });
    expect(value).toBeUndefined();
});

test('filterPrimitiveByExtension returns undefined if the extension does not (fully) match', () => {
    const extensionMatch = {
        url: faker.internet.url(),
    };
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
        _text: {
            extension: [extensionMatch],
        },
    };

    const value = filterPrimitiveByExtension(data, 'text', {
        url: extensionMatch.url,
        valueCode: faker.lorem.word(),
    });
    expect(value).toBeUndefined();
});

test('filterPrimitiveByExtension returns value if the extension matches', () => {
    const extensionMatch = {
        url: faker.internet.url(),
        valueCode: faker.lorem.word(),
    };
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
        _text: {
            extension: [extensionMatch],
        },
    };

    const value = filterPrimitiveByExtension(data, 'text', { url: extensionMatch.url });
    expect(value).toBe(data.text);
});

test('filterPrimitiveByExtension arrays: returns empty array if the filter does not match', () => {
    const extensionMatch = {
        url: faker.internet.url(),
        valueCode: faker.lorem.word(),
    };
    const data: HumanNameR3 = {
        given: [faker.lorem.word()],
        _given: [
            {
                extension: [extensionMatch],
            },
        ],
    };

    const value = filterPrimitiveByExtension(data, 'given', {
        url: extensionMatch.url + faker.lorem.word(),
    });
    expect(value).toEqual([]);
});

test('filterPrimitiveByExtension returns array containing matches', () => {
    const extensionMatch = {
        url: faker.internet.url(),
        valueCode: faker.lorem.word(),
    };
    const data: HumanNameR3 = {
        given: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        _given: [
            {
                extension: [extensionMatch],
            },
            {
                id: faker.string.uuid(),
            },
            {
                extension: [extensionMatch],
            },
        ],
    };

    const value = filterPrimitiveByExtension(data, 'given', extensionMatch);
    expect(value![0]).toBe(data.given![0]);
    expect(value![1]).toBe(data.given![2]);
});
