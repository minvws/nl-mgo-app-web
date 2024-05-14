import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { useUniqueId } from './useUniqueId';

vi.mock('lodash', () => ({
    uniqueId: vi.fn(() => 1),
}));

test.each<[string[], string[]]>([
    [['foo'], ['foo-1-0']],
    [
        ['foo', 'bar'],
        ['foo-1-0', 'bar-1-1'],
    ],
    [
        ['foo', 'foo'],
        ['foo-1-0', 'foo-1-1'],
    ],
])('always returns a unique set of ids %#', async (input, expected) => {
    const { result } = renderHook(() => useUniqueId(...input));

    expect(result.current).toEqual(expected);
});
