import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { ButtonCard } from './ButtonCard';

type Story = StoryObj<typeof ButtonCard>;
type StoryMeta = Meta<typeof ButtonCard>;

export default {
    component: ButtonCard,
    args: {
        title: 'title',
        description: 'description',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overflow: Story = {
    render: () => (
        <div>
            <ButtonCard
                title="Suntexplicabodoloresimpeditquoerroreaporrotemporibus."
                description="Pariaturaliquidquoquasvoluptatibusipsamsitasperioresautem."
            />
        </div>
    ),
};
export const LoadingState: Story = {
    args: {
        isLoading: true,
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <ButtonCard {...args} />
                <ButtonCard {...args} isLoading />
            </Stack>
        </DarkStory>
    ),
};
