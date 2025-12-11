import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Input } from './Input';

type Story = StoryObj<typeof Input>;
type StoryMeta = Meta<typeof Input>;

export default {
    component: Input,
    args: {
        name: 'name',
        id: 'name',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <Input {...args} />
                <Input {...args} invalid />
            </Stack>
        </DarkStory>
    ),
};
