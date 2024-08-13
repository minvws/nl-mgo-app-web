import { expect, test } from 'vitest';
import { map } from './map';

const parserFunction = (x: string | null | undefined) => x;

test('collection returns null if there is no collection', () => {
    expect(map(undefined as string[] | undefined, parserFunction)).toBe(null);
});

test('collection returns null if the collection is empty', () => {
    expect(map([], parserFunction)).toEqual(null);
});

test('collection returns values from collection', () => {
    expect(map(['foo', 'bar'], parserFunction)).toEqual(['foo', 'bar']);
});

test('collection drops undefined and null values from collection', () => {
    const input = ['foo', undefined, 'bar', null, undefined];
    const result = map(input, parserFunction);
    expect(result).toEqual(['foo', 'bar']);
});
