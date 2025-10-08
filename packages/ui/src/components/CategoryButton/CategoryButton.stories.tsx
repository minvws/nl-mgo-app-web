import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { CategoryButton } from './CategoryButton';

type Story = StoryObj<typeof CategoryButton>;
type StoryMeta = Meta<typeof CategoryButton>;

export default {
    component: CategoryButton,
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        children: 'Label',
        icon: 'health_cross',
    },
};

export const Loading: Story = {
    args: {
        children: 'Label',
        isLoading: true,
        loadingText: 'Loading...',
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Label',
        icon: 'health_cross',
    },
};

export const WithSubLabel: Story = {
    args: {
        children: 'Label',
        label: 'Sublabel',
    },
};

export const Overview: Story = {
    args: {
        children: 'Label',
    },
    render: ({ children }) => (
        <DarkStory>
            <Stack>
                <CategoryButton icon="health_cross">{children}</CategoryButton>
                <CategoryButton icon="health_cross" label="as link" asChild>
                    <a href="#">{children}</a>
                </CategoryButton>
                <CategoryButton icon="health_cross" isLoading loadingText="currently loading...">
                    {children}
                </CategoryButton>
            </Stack>
        </DarkStory>
    ),
};
