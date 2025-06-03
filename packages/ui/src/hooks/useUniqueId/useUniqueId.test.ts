import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { useUniqueId } from './useUniqueId';

vi.mock('lodash', () => ({
    uniqueId: vi.fn(() => 1),
}));

test.each<[string, string]>([
    ['foo', 'foo-1'],
    ['bar', 'bar-1'],
])('can create a single id %#', async (input, expected) => {
    const { result } = renderHook(() => useUniqueId(input));

    expect(result.current).toEqual(expected);
});

test.each<[string[], string[]]>([
    [
        ['foo', 'bar'],
        ['foo-1-0', 'bar-1-1'],
    ],
    [
        ['foo', 'foo'],
        ['foo-1-0', 'foo-1-1'],
    ],
])('can create a set of ids %#', async (input, expected) => {
    const { result } = renderHook(() => useUniqueId(...input));
    expect(result.current).toEqual(expected);
});
