import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

type Story = StoryObj<typeof IconButton>;
type StoryMeta = Meta<typeof IconButton>;

export default {
    component: IconButton,
    args: {
        name: 'Close',
        label: 'Sluiten',
    },
} satisfies StoryMeta;

export const Default: Story = {};
