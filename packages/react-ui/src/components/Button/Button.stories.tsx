import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { Button } from './Button';
import { variants } from './variants';

type Story = StoryObj<typeof Button>;
type StoryMeta = Meta<typeof Button>;

export default {
    component: Button,
    args: {
        children: 'Label',
        onClick: action('on-click'),
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const FullWidth: Story = {
    args: {
        className: 'w-full',
    },
};

export const WithIcon: Story = {
    args: {
        variant: 'ghost',
    },
    render: ({ ...args }) => (
        <Stack className="flex-row">
            <Button {...args} variant={args.variant} leftIcon="chevron-left">
                With icon
            </Button>
        </Stack>
    ),
};

export const AsChildLink: Story = {
    render: ({ onClick: _onClick, ...args }) => (
        <Button {...args} variant={args.variant} leftIcon="chevron-left" asChild>
            <a href="#foo">I&apos;m a link</a>
        </Button>
    ),
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack className="gap-8">
            {variants.map((variant, index) => (
                <Stack className="flex-row" key={index}>
                    <Button {...args} variant={variant}>
                        {variant}
                    </Button>
                    <Button {...args} variant={variant} leftIcon="chevron-left">
                        {variant}
                    </Button>
                    <Button {...args} variant={variant} rightIcon="chevron-right">
                        {variant}
                    </Button>
                    <Button {...args} variant={variant} isDisabled>
                        {`${variant} isDisabled`}
                    </Button>
                </Stack>
            ))}
        </Stack>
    ),
};
