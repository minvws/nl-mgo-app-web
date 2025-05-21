import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Card } from './Card';

type Story = StoryObj<typeof Card>;
type StoryMeta = Meta<typeof Card>;

export default {
    component: Card,
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Card {...args} />
        </DarkStory>
    ),
};
