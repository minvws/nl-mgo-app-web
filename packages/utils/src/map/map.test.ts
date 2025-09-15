import { expect, test } from 'vitest';
import { map } from './map.js';

const parserFunction = (x: string | null | undefined) => x;

test('collection returns undefined if there is no collection', () => {
    expect(map(undefined as string[] | undefined, parserFunction)).toBeUndefined();
});

test('collection returns an empty array if returnEmpty is set to true and there is no collection', () => {
    expect(map(undefined as string[] | undefined, parserFunction, true)).toEqual([]);
});

test('collection returns undefined if the collection is empty', () => {
    expect(map([], parserFunction)).toBeUndefined();
});

test('collection returns values from collection', () => {
    expect(map(['foo', 'bar'], parserFunction)).toEqual(['foo', 'bar']);
});

test('collection drops undefined and null values from collection', () => {
    const input = ['foo', undefined, 'bar', null, undefined];
    const result = map(input, parserFunction);
    expect(result).toEqual(['foo', 'bar']);
});
