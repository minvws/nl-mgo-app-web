import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

type Story = StoryObj<typeof Drawer.Content>;
type StoryMeta = Meta<typeof Drawer.Content>;

export default {
    component: Drawer.Content,
    args: {
        title: 'Medication details',
        closeButtonLabel: 'Sluiten',
        backButtonLabel: 'Terug',
        showBackButton: true,
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ ...args }) => {
        return (
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <Button>Open details</Button>
                </Drawer.Trigger>

                <Drawer.Content {...args}>
                    <div className="space-y-2">
                        <p>Prescribed by: Amsterdam Medical Center</p>
                        <p>Dosage: 2x per day</p>
                        <p>Start date: 2026-03-12</p>
                    </div>
                </Drawer.Content>
            </Drawer.Root>
        );
    },
};

export const LeftSide: Story = {
    render: ({ ...args }) => {
        return (
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <Button>Open details</Button>
                </Drawer.Trigger>

                <Drawer.Content {...args} side="left">
                    <p>The drawer can also slide in from the left side.</p>
                </Drawer.Content>
            </Drawer.Root>
        );
    },
};

export const Controlled: Story = {
    render: ({ ...args }) => {
        const [open, setOpen] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks

        return (
            <>
                <Button onClick={() => setOpen(true)}>Open details</Button>
                <Drawer.Root open={open} onOpenChange={setOpen}>
                    <Drawer.Content {...args}>
                        <p>
                            Use controlled mode when the page state drives when detailed context
                            needs to be shown.
                        </p>
                    </Drawer.Content>
                </Drawer.Root>
            </>
        );
    },
};

export const BottomSide: Story = {
    render: ({ ...args }) => {
        return (
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <Button>Open details</Button>
                </Drawer.Trigger>

                <Drawer.Content {...args} side="bottom">
                    <div className="space-y-2">
                        {Array.from({ length: 50 }).map((_, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <p key={index}>
                                Detail row {index + 1} Neque nam omnis numquam sit amet earum iste
                                consequatur.
                            </p>
                        ))}
                    </div>
                </Drawer.Content>
            </Drawer.Root>
        );
    },
};
