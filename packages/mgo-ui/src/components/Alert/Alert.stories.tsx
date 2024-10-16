import type { Meta, StoryObj } from '@storybook/react';
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
