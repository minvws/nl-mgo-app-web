import { act, renderHook } from '@testing-library/react';
import { beforeAll, expect, test, vi } from 'vitest';
import { useDarkMode } from './useDarkMode';

const matchMedia = vi.fn();

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: matchMedia,
    });
});

export function mockMatchMedia(match: Partial<MediaQueryList>) {
    matchMedia.mockImplementation((_query: string) => {
        return {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            ...match,
        };
    });
}

test.each([false, true])('returns the current dark mode value when value is %j', (matches) => {
    mockMatchMedia({ matches });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toEqual(matches);
});

test('updates the dark mode value when it changes', async () => {
    let listener: (e: MediaQueryListEvent) => unknown;
    mockMatchMedia({
        matches: false,
        addEventListener: vi.fn((_event, eventListener) => {
            listener = eventListener as EventListener;
        }),
    });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toEqual(false);
    act(() => {
        listener!({ matches: true } as MediaQueryListEvent);
    });
    expect(result.current).toEqual(true);
});

test('defaults to false', async () => {
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn((_query: string) => undefined),
    });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toEqual(false);
});
