import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
    args: {
        label: 'Solid',
        variant: 'solid',
    },
};

export const Light: Story = {
    args: {
        label: 'Light',
        variant: 'light',
    },
};

export const Outline: Story = {
    args: {
        label: 'Outline',
        variant: 'outline',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true,
    },
};
