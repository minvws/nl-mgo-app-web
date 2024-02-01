import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { variants } from './variants';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Button> = {
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

export const Overview: Story = {
    args: {
        label: 'Label',
    },
    render: ({ ...args }) => {
        return (
            <div>
                <Stack>
                    {variants.map((variant) => (
                        <Stack className="flex-row">
                            <Button {...args} label={variant} variant={variant} />
                            <Button
                                {...args}
                                label={`${variant} disabled`}
                                variant={variant}
                                disabled
                            />
                        </Stack>
                    ))}
                </Stack>
            </div>
        );
    },
};
