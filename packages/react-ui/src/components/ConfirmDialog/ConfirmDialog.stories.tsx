import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../Button/Button';

type Story = StoryObj<typeof ConfirmDialog>;
type StoryMeta = Meta<typeof ConfirmDialog>;

export default {
    component: ConfirmDialog,
    args: {
        title: 'Titel',
        description: 'Dit is een beschrijving',
        confirmButtonText: 'Verwijderen',
        cancelButtonText: 'Annuleren',
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
