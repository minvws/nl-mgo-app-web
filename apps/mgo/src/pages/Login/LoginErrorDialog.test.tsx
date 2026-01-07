import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { LoginErrorDialog } from './LoginErrorDialog';

afterEach(() => {
    vi.resetAllMocks();
});

test('shows error dialog when auth error is present', async () => {
    const authError = new Error();
    setupWithAppProviders(<LoginErrorDialog authError={authError} />);

    screen.getByRole('alertdialog', {
        name: appMessage('login.error_heading'),
    });
});

test('closes error dialog when confirm button is clicked', async () => {
    const authError = new Error();
    const { user } = setupWithAppProviders(<LoginErrorDialog authError={authError} />);

    let dialog: HTMLElement | null = screen.getByRole('alertdialog', {
        name: appMessage('login.error_heading'),
    });
    const confirmButton = within(dialog).getByRole('button', {
        name: appMessage('common.ok'),
    });

    expect(dialog).toBeVisible();
    await user.click(confirmButton);

    dialog = await screen.queryByRole('alertdialog', {
        name: appMessage('login.error_heading'),
    });

    expect(dialog).not.toBeInTheDocument();
});

test('shows error dialog when auth error is set later', async () => {
    const { rerender } = setupWithAppProviders(<LoginErrorDialog authError={null} />);

    let dialog: HTMLElement | null = screen.queryByRole('alertdialog', {
        name: appMessage('login.error_heading'),
    });

    expect(dialog).not.toBeInTheDocument();

    rerender(<LoginErrorDialog authError={new Error()} />);

    dialog = screen.queryByRole('alertdialog', {
        name: appMessage('login.error_heading'),
    });

    expect(dialog).toBeInTheDocument();
});
