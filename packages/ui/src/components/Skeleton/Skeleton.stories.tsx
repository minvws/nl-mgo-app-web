import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '.';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';

type Story = StoryObj<typeof Skeleton>;
type StoryMeta = Meta<typeof Skeleton>;

export default {
    component: Skeleton,
    args: {
        isLoading: true,
        children: <span>Loaded</span>,
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const SkeletonCircleStory: Story = {
    name: 'SkeletonCircle',
    render: ({ ...args }) => <SkeletonCircle className="h-12 w-12" {...args} />,
};

export const SkeletonTextStory: StoryObj<typeof SkeletonText> = {
    name: 'SkeletonText',
    args: {
        numberOfLines: 2,
        height: 'h-6',
    },
    render: ({ ...args }) => <SkeletonText className="flex flex-col gap-3" {...args} />,
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <Skeleton {...args} />
                <SkeletonCircle className="h-12 w-12" {...args} />
                <SkeletonText
                    className="flex flex-col gap-3"
                    {...args}
                    numberOfLines={2}
                    height="h-6"
                />
            </Stack>
        </DarkStory>
    ),
};
