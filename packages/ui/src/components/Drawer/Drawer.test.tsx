import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { expect, test, vi } from 'vitest';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

test('renders drawer with an accessible title', async () => {
    render(
        <Drawer.Root open>
            <Drawer.Content title={faker.word.sample()} closeButtonLabel={faker.word.sample()}>
                <p>{faker.lorem.sentence()}</p>
            </Drawer.Content>
        </Drawer.Root>
    );

    const element = await screen.findByRole('dialog');
    expect(element).toBeVisible();
    expect(within(element).getByRole('heading', { level: 2 })).toBeVisible();
});

test('close button closes the drawer in controlled mode', async () => {
    const user = userEvent.setup();
    const closeLabel = faker.word.sample();

    const Wrapper = () => {
        const [open, setOpen] = useState(true);

        return (
            <Drawer.Root open={open} onOpenChange={setOpen}>
                <Drawer.Content title={faker.word.sample()} closeButtonLabel={closeLabel}>
                    <Button>Action</Button>
                </Drawer.Content>
            </Drawer.Root>
        );
    };

    render(<Wrapper />);

    const element = await screen.findByRole('dialog');
    expect(element).toBeVisible();

    await user.click(within(element).getByRole('button', { name: closeLabel }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('drawer can be opened and closed in uncontrolled mode', async () => {
    const user = userEvent.setup();
    const openLabel = faker.word.sample();
    const closeLabel = faker.word.sample();

    render(
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <Button>{openLabel}</Button>
            </Drawer.Trigger>
            <Drawer.Content title={faker.word.sample()} closeButtonLabel={closeLabel}>
                <p>{faker.lorem.sentence()}</p>
            </Drawer.Content>
        </Drawer.Root>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: openLabel }));
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeVisible();

    await user.click(within(dialog).getByRole('button', { name: closeLabel }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('renders optional back button and calls callback', async () => {
    const user = userEvent.setup();
    const onBackButtonClick = vi.fn();
    const backButtonLabel = faker.word.sample();

    render(
        <Drawer.Root open>
            <Drawer.Content
                title={faker.word.sample()}
                closeButtonLabel={faker.word.sample()}
                backButtonLabel={backButtonLabel}
                showBackButton
                onBackButtonClick={onBackButtonClick}
            >
                <p>{faker.lorem.sentence()}</p>
            </Drawer.Content>
        </Drawer.Root>
    );

    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: backButtonLabel }));
    expect(onBackButtonClick).toHaveBeenCalledOnce();
});
