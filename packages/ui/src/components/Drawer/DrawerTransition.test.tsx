import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { DrawerTransition } from './DrawerTransition';

test('does not render children when closed', () => {
    render(
        <DrawerTransition open={false} side="right">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    expect(screen.queryByTestId('transition-child')).not.toBeInTheDocument();
});

test('renders children when opened and schedules animation frame', () => {
    const requestAnimationFrameSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 101);

    render(
        <DrawerTransition open side="left">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    expect(screen.getByTestId('transition-child')).toBeVisible();
    expect(requestAnimationFrameSpy).toHaveBeenCalledOnce();

    requestAnimationFrameSpy.mockRestore();
});

test('unmount cancels scheduled animation frame', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 202);
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = render(
        <DrawerTransition open side="bottom">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    unmount();
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(202);

    vi.restoreAllMocks();
});

test('unmount without scheduled animation frame does not cancel', () => {
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = render(
        <DrawerTransition open={false} side="right">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    unmount();
    expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();

    cancelAnimationFrameSpy.mockRestore();
});

test('removes children when closing', async () => {
    const { rerender } = render(
        <DrawerTransition open side="right">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    expect(screen.getByTestId('transition-child')).toBeVisible();

    rerender(
        <DrawerTransition open={false} side="right">
            {() => <div data-testid="transition-child" />}
        </DrawerTransition>
    );

    await waitFor(() => {
        expect(screen.queryByTestId('transition-child')).not.toBeInTheDocument();
    });
});
