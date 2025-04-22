import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { ConfirmDialog } from './ConfirmDialog';

type Story = StoryObj<typeof ConfirmDialog>;
type StoryMeta = Meta<typeof ConfirmDialog>;

export default {
    component: ConfirmDialog,
    args: {
        title: 'Inventore quae delectus eveniet consectetur aspernatur?',
        description: 'Ab fugit officiis dolore esse quia voluptatem voluptatibus sapiente.',
        confirmButtonText: 'Accusamus dicta',
        cancelButtonText: 'Cupiditate',
        onConfirm: action('on-confirm'),
    },
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        children: (
            <ConfirmDialog.Trigger asChild>
                <Button>Open</Button>
            </ConfirmDialog.Trigger>
        ),
    },
};

export const OnlyConfirm: Story = {
    args: {
        cancelButtonText: undefined,
        children: (
            <ConfirmDialog.Trigger asChild>
                <Button>Open</Button>
            </ConfirmDialog.Trigger>
        ),
    },
};
