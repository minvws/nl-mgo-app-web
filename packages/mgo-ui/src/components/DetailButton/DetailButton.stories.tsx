import type { Meta, StoryObj } from '@storybook/react';
import { DetailButton } from './DetailButton';

type Story = StoryObj<typeof DetailButton>;
type StoryMeta = Meta<typeof DetailButton>;

export default {
    component: DetailButton,
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        title: 'title',
        description: 'description',
    },
};

export const WithDate: Story = {
    args: {
        title: 'title',
        description: 'description',
        date: 'Vandaag',
    },
};
