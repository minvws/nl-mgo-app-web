import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { DescriptionCard } from './DescriptionCard';

type Story = StoryObj<typeof DescriptionCard>;
type StoryMeta = Meta<typeof DescriptionCard>;

export default {
    component: DescriptionCard,
    args: {
        term: 'Ab maxime',
        details: 'Facere enim similique illo ratione assumenda placeat quas.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <DescriptionCard {...args} />
        </DarkStory>
    ),
};
