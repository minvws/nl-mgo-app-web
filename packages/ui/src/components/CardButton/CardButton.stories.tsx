import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { CardButton } from './CardButton';

type Story = StoryObj<typeof CardButton>;
type StoryMeta = Meta<typeof CardButton>;

export default {
    component: CardButton,
    args: {
        title: 'title',
        description: 'description',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const WithDate: Story = {
    args: {
        detail: '14 mrt 2022',
    },
};

export const WithDateAndIcon: Story = {
    args: {
        detail: '14 mrt 2022',
        descriptionIcon: 'medical_information',
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <CardButton {...args} />
                <CardButton {...args} detail="14 mrt 2022" />
                <CardButton {...args} descriptionIcon="calendar_today" detail="14 mrt 2022" />
            </Stack>
        </DarkStory>
    ),
};
