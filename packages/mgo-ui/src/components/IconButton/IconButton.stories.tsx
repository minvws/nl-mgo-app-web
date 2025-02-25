import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { IconButton } from './IconButton';

type Story = StoryObj<typeof IconButton>;
type StoryMeta = Meta<typeof IconButton>;

export default {
    component: IconButton,
    args: {
        icon: 'close',
        'aria-label': 'Sluiten',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <IconButton {...args} />
        </DarkStory>
    ),
};
