import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
};

export default meta;

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
