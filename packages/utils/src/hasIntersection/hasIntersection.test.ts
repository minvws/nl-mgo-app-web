import { expect, test } from 'vitest';
import { hasIntersection } from './hasIntersection.js';

test('returns true if there is an intersection', async () => {
    const result = hasIntersection([1, 2, 3], [3, 4, 5]);
    expect(result).toBe(true);
});

test('returns false if there is no intersection', async () => {
    const result = hasIntersection([1, 2, 3], [6, 7, 8]);
    expect(result).toBe(false);
});

test('returns true if there is referential intersection', async () => {
    const value = { foo: 'bar' };
    const result = hasIntersection([value, { foo: 'baz' }], [{ baz: 'bak' }, value]);
    expect(result).toBe(true);
});

test('returns false if there is no referential intersection', async () => {
    const value = { foo: 'bar' };
    const result = hasIntersection([value, { foo: 'baz' }], [{ ...value }]);
    expect(result).toBe(false);
});
