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
        icon: 'diagnosis',
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
        icon: 'diagnosis',
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
                <CategoryButton icon="diagnosis">{children}</CategoryButton>
                <CategoryButton icon="diagnosis" label="as link" asChild>
                    <a href="#">{children}</a>
                </CategoryButton>
                <CategoryButton icon="diagnosis" isLoading loadingText="currently loading...">
                    {children}
                </CategoryButton>
            </Stack>
        </DarkStory>
    ),
};
