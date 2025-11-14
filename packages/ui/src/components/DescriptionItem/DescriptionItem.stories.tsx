import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { DescriptionItem } from './DescriptionItem';

type Story = StoryObj<typeof DescriptionItem>;
type StoryMeta = Meta<typeof DescriptionItem>;

export default {
    component: DescriptionItem,
    args: {
        term: 'Ab maxime',
        details: 'Facere enim similique illo ratione assumenda placeat quas.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="gap-8">
                <DescriptionItem {...args} />
                <DescriptionItem details={args.details} />
            </Stack>
        </DarkStory>
    ),
};
