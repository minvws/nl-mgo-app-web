import { faker } from '$test';
import { type HumanName as HumanNameR3 } from '@minvws/mgo-fhir/r3';
import { expect, test } from 'vitest';
import { filterPrimitive } from './filterPrimitive.js';

test('filterPrimitive returns undefined if there is no element', () => {
    const data = undefined as HumanNameR3 | undefined;
    const value = filterPrimitive(data, 'text', () => false);
    expect(value).toBeUndefined();
});

test('filterPrimitive returns undefined if the filter does not match', () => {
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
        _text: {
            id: faker.string.uuid(),
        },
    };

    const value = filterPrimitive(data, 'text', () => false);
    expect(value).toBeUndefined();
});

test('filterPrimitive returns undefined if the value is undefined', () => {
    const data: HumanNameR3 = {
        _text: {
            id: faker.string.uuid(),
        },
    };

    const value = filterPrimitive(data, 'text', () => true);
    expect(value).toBeUndefined();
});

test('filterPrimitive returns undefined if the meta data is undefined', () => {
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
    };

    const value = filterPrimitive(data, 'text', () => true);
    expect(value).toBeUndefined();
});

test('filterPrimitive returns undefined if both the value and meta data are undefined', () => {
    const data: HumanNameR3 = {};

    const value = filterPrimitive(data, 'text', () => true);
    expect(value).toBeUndefined();
});

test('filterPrimitive returns the value if the filter matches', () => {
    const data: HumanNameR3 = {
        text: faker.lorem.word(),
        _text: {
            id: faker.string.uuid(),
        },
    };

    const value = filterPrimitive(data, 'text', (meta) => meta.id === data._text!.id);
    expect(value).toBe(data.text);
});

test('filterPrimitive arrays: returns empty array if the filter does not match', () => {
    const data: HumanNameR3 = {
        given: [faker.lorem.word()],
        _given: [
            {
                id: faker.string.uuid(),
            },
        ],
    };

    const value = filterPrimitive(data, 'given', () => false);
    expect(value).toEqual([]);
});

test('filterPrimitive arrays: returns empty array if there is not meta data', () => {
    const data: HumanNameR3 = {
        given: [faker.lorem.word()],
        _given: undefined,
    };

    const value = filterPrimitive(data, 'given', () => false);
    expect(value).toEqual([]);
});

test('filterPrimitive returns array containing matches', () => {
    const matchingId = faker.string.uuid();
    const data: HumanNameR3 = {
        given: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        _given: [
            {
                id: matchingId,
            },
            {
                id: faker.string.uuid(),
            },
            {
                id: matchingId,
            },
        ],
    };

    const value = filterPrimitive(data, 'given', (meta) => meta.id === matchingId);
    expect(value![0]).toBe(data.given![0]);
    expect(value![1]).toBe(data.given![2]);
});
