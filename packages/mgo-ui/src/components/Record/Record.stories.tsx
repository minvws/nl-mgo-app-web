import type { StoryObj } from '@storybook/react';
import { Record } from './Record';

type StoryArgs = { label: string; description: string; date: string };
type Story = StoryObj<StoryArgs>;

export default {
    component: Record,
    args: {
        label: 'Ab maxime',
        description: 'Facere enim similique illo ratione assumenda placeat quas.',
    },
};

export const Default: Story = {
    render: ({ label, description }) => (
        <Record>
            <Record.Label>{label}</Record.Label>
            <Record.Description>{description}</Record.Description>
        </Record>
    ),
};
