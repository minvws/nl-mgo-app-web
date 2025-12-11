import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { HealthCategoryButton } from './HealthCategoryButton';

type Story = StoryObj<typeof HealthCategoryButton>;
type StoryMeta = Meta<typeof HealthCategoryButton>;

export default {
    component: HealthCategoryButton,
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        icon: 'health_cross',
        title: 'Title',
        subtitle: 'Subtitle',
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        title: 'Title',
        subtitle: 'Subtitle',
        icon: 'health_cross',
    },
};

export const EmptyState: Story = {
    args: {
        icon: 'health_cross',
        title: 'Title',
        subtitle: 'Subtitle',
        statusLabel: 'Empty',
    },
};

export const Overview: Story = {
    args: {},
    render: () => (
        <DarkStory>
            <Stack>
                <HealthCategoryButton icon="health_cross" title="Title" subtitle="Subtitle" />
                <HealthCategoryButton
                    icon="health_cross"
                    loading
                    title="Title"
                    subtitle="Subtitle"
                />
                <HealthCategoryButton
                    icon="health_cross"
                    title="Title"
                    subtitle="Subtitle"
                    statusLabel="Empty"
                />
            </Stack>
        </DarkStory>
    ),
};
