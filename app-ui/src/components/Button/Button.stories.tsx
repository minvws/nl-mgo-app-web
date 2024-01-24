import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonType } from './Button';

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
        type: ButtonType.SOLID,
    },
};

export const Light: Story = {
    args: {
        label: 'Light',
        type: ButtonType.LIGHT,
    },
};

export const Outline: Story = {
    args: {
        label: 'Outline',
        type: ButtonType.OUTLINE,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true
    }
};