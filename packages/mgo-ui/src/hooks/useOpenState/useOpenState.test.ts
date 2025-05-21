import { act, renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { type UseOpenStateProps, useOpenState } from './useOpenState';

test('Open', async () => {
    const config: UseOpenStateProps = {
        beforeOpen: vi.fn(),
        afterOpen: vi.fn(),
    };

    const { result } = renderHook(() => useOpenState(config));
    expect(result.current.isOpen).toBeFalsy();

    act(() => {
        result.current.open();
    });

    expect(config.beforeOpen).toHaveBeenCalledOnce();
    expect(result.current.isOpen).toBeTruthy();
    expect(config.afterOpen).toHaveBeenCalledOnce();
});

test('Close', async () => {
    const config: UseOpenStateProps = {
        defaultOpen: true,
        beforeClose: vi.fn(),
        afterClose: vi.fn(),
    };

    const { result } = renderHook(() => useOpenState(config));
    expect(result.current.isOpen).toBeTruthy();

    act(() => {
        result.current.close();
    });

    expect(config.beforeClose).toHaveBeenCalledOnce();
    expect(result.current.isOpen).toBeFalsy();
    expect(config.afterClose).toHaveBeenCalledOnce();
});

test('Toggle', async () => {
    const { result } = renderHook(() => useOpenState());
    expect(result.current.isOpen).toBeFalsy();

    act(() => {
        result.current.toggle();
    });

    expect(result.current.isOpen).toBeTruthy();
});
