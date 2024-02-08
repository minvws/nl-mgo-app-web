import { test, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useIntroSeen, LOCAL_STORAGE_KEY } from './introSeen';

afterEach(() => {
    vi.restoreAllMocks();
});

test.each(['', '1', '0', 'true', 'false', 'null'])(
    'isIntroSeen: false when localStorage has "%s"',
    (value) => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(value);
        const { result } = renderHook(() => useIntroSeen());

        expect(result.current.isIntroSeen).toBe(false);
        expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    }
);

test('isIntroSeen: true when localStorage has ISO8601 datetime', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('2024-02-07T12:00:00.000Z');
    const { result } = renderHook(() => useIntroSeen());

    expect(result.current.isIntroSeen).toBe(true);
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
});

test('setIntroSeen() puts datetime in localStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useIntroSeen());

    act(() => {
        result.current.setIntroSeen();
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
    );
});

test('setIntroSeen(true) puts datetime in localStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useIntroSeen());

    act(() => {
        result.current.setIntroSeen(true);
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
    );
});

test('setIntroSeen(false) removes value from localStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'removeItem');
    const { result } = renderHook(() => useIntroSeen());

    act(() => {
        result.current.setIntroSeen(false);
    });

    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
});
