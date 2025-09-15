import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

test('renders confirm dialog', async () => {
    render(
        <ConfirmDialog
            open
            title={faker.word.sample()}
            description={faker.lorem.sentence()}
            confirmButtonText={faker.word.sample()}
            cancelButtonText={faker.word.sample()}
            closeButtonAriaLabel={faker.word.sample()}
            onConfirm={() => {}}
        />
    );

    const element = await screen.findByRole('alertdialog');
    expect(element).toBeVisible();
});

test('onConfirm is triggered', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const confirmButtonText = faker.word.sample();

    render(
        <ConfirmDialog
            open
            title={faker.word.sample()}
            description={faker.lorem.sentence()}
            confirmButtonText={confirmButtonText}
            cancelButtonText={faker.word.sample()}
            closeButtonAriaLabel={faker.word.sample()}
            onConfirm={onConfirm}
        />
    );

    const element = await screen.findByRole('alertdialog');
    expect(element).toBeVisible();

    await user.click(
        await within(element).findByRole('button', {
            name: confirmButtonText,
        })
    );
    expect(onConfirm).toHaveBeenCalledOnce();
});

test('loading state can be shown on confirm button', async () => {
    const onConfirm = vi.fn();
    const confirmButtonText = faker.word.sample();

    render(
        <ConfirmDialog
            open
            title={faker.word.sample()}
            description={faker.lorem.sentence()}
            confirmButtonText={confirmButtonText}
            cancelButtonText={faker.word.sample()}
            closeButtonAriaLabel={faker.word.sample()}
            onConfirm={onConfirm}
            loading
            loadingTextScreenReader={faker.word.sample()}
        />
    );

    const element = await screen.findByRole('alertdialog');
    expect(element).toBeVisible();

    const confirmButton = await within(element).findByRole('button', {
        name: confirmButtonText,
    });

    const spinner = await within(confirmButton).getByTestId('spinner');
    expect(spinner).toBeVisible();
});
