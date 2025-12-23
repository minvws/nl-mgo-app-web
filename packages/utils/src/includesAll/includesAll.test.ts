import { expect, test } from 'vitest';
import { includesAll } from './includesAll.js';

test('returns true if all items are present', async () => {
    const result = includesAll([1, 2, 3], [1, 2, 3]);
    expect(result).toBe(true);
});

test('returns false if not all items are present', async () => {
    const result = includesAll([1, 2, 3], [3, 4, 5]);
    expect(result).toBe(false);
});

test('returns true if all items are present with referential equality', async () => {
    const value = { foo: 'bar' };
    const result = includesAll([value, { foo: 'baz' }], [value]);
    expect(result).toBe(true);
});
test('returns false if not all items are present with referential equality', async () => {
    const value = { foo: 'bar' };
    const result = includesAll([value, { foo: 'baz' }], [value, { foo: 'baz' }]);
    expect(result).toBe(false);
});
