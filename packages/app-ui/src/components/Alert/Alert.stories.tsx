import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
    args: {
        label: 'Success',
        description: 'Description',
        status: 'success',
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning',
        description: 'Description',
        status: 'warning',
    },
};

export const Info: Story = {
    args: {
        label: 'Info',
        description: 'Description',
        status: 'info',
    },
};
