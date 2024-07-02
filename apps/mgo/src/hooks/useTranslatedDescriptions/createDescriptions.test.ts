import { expect, test } from 'vitest';
import { createDescriptions } from './createDescriptions';

test('returns descriptions, with the original key and value, in the specified order: 2, 1', () => {
    const value = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
    };
    const descriptions = createDescriptions(value, ['key2', 'key1']);

    expect(descriptions).toEqual([
        {
            key: 'key2',
            value: 'value2',
            term: { id: 'fhir.key2' },
            details: 'value2',
        },
        {
            key: 'key1',
            value: 'value1',
            term: { id: 'fhir.key1' },
            details: 'value1',
        },
    ]);
});

test('returns descriptions, with the original key and value, in the specified order: 2, 3', () => {
    const value = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
    };
    const descriptions = createDescriptions(value, ['key2', 'key3']);

    expect(descriptions).toEqual([
        {
            key: 'key2',
            value: 'value2',
            term: { id: 'fhir.key2' },
            details: 'value2',
        },
        {
            key: 'key3',
            value: 'value3',
            term: { id: 'fhir.key3' },
            details: 'value3',
        },
    ]);
});
