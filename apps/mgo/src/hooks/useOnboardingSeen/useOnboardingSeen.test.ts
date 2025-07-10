import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

import { LOCAL_STORAGE_KEY, useOnboardingSeen } from './useOnboardingSeen';

afterEach(() => {
    vi.restoreAllMocks();
});

test.each(['', '1', '0', 'true', 'false', 'null'])(
    'isOnboardingSeen: false when localStorage has "%s"',
    (value) => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(value);
        const { result } = renderHook(() => useOnboardingSeen());

        expect(result.current.isOnboardingSeen).toBe(false);
        expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    }
);

test('isOnboardingSeen: true when localStorage has ISO8601 datetime', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('2024-02-07T12:00:00.000Z');
    const { result } = renderHook(() => useOnboardingSeen());

    expect(result.current.isOnboardingSeen).toBe(true);
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
});

test('setOnboardingSeen() puts datetime in localStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useOnboardingSeen());

    act(() => {
        result.current.setOnboardingSeen();
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
    );
});

test('setOnboardingSeen() puts datetime in localStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useOnboardingSeen());

    act(() => {
        result.current.setOnboardingSeen();
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
    );
});
