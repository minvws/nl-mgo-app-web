import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertStatus } from './Alert';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
    args: {
        label: 'Success',
        description: 'Description',
        status: AlertStatus.SUCCESS
    },
};