import type { Meta, StoryObj } from '@storybook/react';
import { ButtonCard } from './ButtonCard';

type Story = StoryObj<typeof ButtonCard>;
type StoryMeta = Meta<typeof ButtonCard>;

export default {
    component: ButtonCard,
    args: {
        title: 'title',
        description: 'description',
        icon: 'Hospital',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const LoadingState: Story = {
    args: {
        isLoading: true,
    },
};
