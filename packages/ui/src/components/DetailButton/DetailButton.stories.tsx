import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { DetailButton } from './DetailButton';

type Story = StoryObj<typeof DetailButton>;
type StoryMeta = Meta<typeof DetailButton>;

export default {
    component: DetailButton,
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
                <DetailButton {...args} />
                <DetailButton {...args} detail="14 mrt 2022" />
                <DetailButton {...args} descriptionIcon="calendar_today" detail="14 mrt 2022" />
            </Stack>
        </DarkStory>
    ),
};
