import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
    args: {
        label: 'Success',
        status: 'success',
        children: 'Description',
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning',
        status: 'warning',
        children: 'Description',
    },
};

export const Info: Story = {
    args: {
        label: 'Info',
        status: 'info',
        children: 'Description',
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <Alert {...args} label="Success" status="success">
                    Description
                </Alert>
                <Alert {...args} label="Warning" status="warning">
                    Description
                </Alert>
                <Alert {...args} label="Info" status="info">
                    Description
                </Alert>
            </Stack>
        </DarkStory>
    ),
};
