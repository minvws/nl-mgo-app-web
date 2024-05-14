import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '.';

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

type SkeletonTextStory = StoryObj<typeof SkeletonText>;
export const SkeletonTextStory: SkeletonTextStory = {
    name: 'SkeletonText',
    args: {
        numberOfLines: 2,
        height: 'h-6',
    },
    render: ({ ...args }) => <SkeletonText className="flex flex-col gap-3" {...args} />,
};
