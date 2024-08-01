import { expect, test } from 'vitest';
import { collection } from './collection';
import { EMPTY_VALUE } from '../../type';

const parserFunction = (x: unknown) => x;

test('collection returns EMPTY_VALUE if there is no collection', () => {
    expect(collection(undefined, parserFunction)).toBe(EMPTY_VALUE);
});

test('collection returns EMPTY_VALUE if the collection is empty', () => {
    expect(collection([], parserFunction)).toEqual(EMPTY_VALUE);
});

test('collection returns values from collection', () => {
    expect(collection(['foo', 'bar'], parserFunction)).toEqual(['foo', 'bar']);
});

test('collection drops undefined values from collection', () => {
    expect(collection(['foo', undefined, 'bar', undefined], parserFunction)).toEqual([
        'foo',
        'bar',
    ]);
});
