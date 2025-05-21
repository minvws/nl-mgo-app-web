import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { useKeyDown, type KeyDownOptions } from './useKeyDown';

test('Triggers callback on key down events', async () => {
    const options: KeyDownOptions = {
        key: 'Escape',
        callback: vi.fn(),
    };

    const user = userEvent.setup();
    renderHook(() => useKeyDown(options));

    expect(options.callback).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    expect(options.callback).toHaveBeenCalledOnce();
});

test('Removes listeners on unmount', async () => {
    const options: KeyDownOptions = {
        key: 'Escape',
        callback: vi.fn(),
    };

    const user = userEvent.setup();
    const { unmount } = renderHook(() => useKeyDown(options));

    unmount();

    await user.keyboard('{Escape}');
    expect(options.callback).not.toHaveBeenCalled();
});
