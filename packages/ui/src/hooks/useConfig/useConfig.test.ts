import { renderHook } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { useConfig } from './useConfig';

beforeEach(() => {
    useConfig().animations = true;
});

test('returns config', async () => {
    const { result } = renderHook(() => useConfig());
    expect(result.current.animations).toBe(true);
});

test('config is mutable', async () => {
    const { result } = renderHook(() => useConfig());
    result.current.animations = false;

    const { result: newResult } = renderHook(() => useConfig());
    expect(newResult.current.animations).toBe(false);
});
