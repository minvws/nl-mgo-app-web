import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { ChevronLeft, ChevronRight } from '../icons';
import { Button, ButtonProps } from './Button';
import { variants } from './variants';

type Story = StoryObj<typeof Button>;
type StoryMeta = Meta<typeof Button>;

export default {
    component: Button,
    args: {
        children: 'Label',
        onClick: action('on-click'),
    },
    parameters: {
        controls: {
            // Normally storybook filters out default HTML props, but it seems to
            // have trouble with the `oneOf` type of the `ButtonOrLink` component.
            include: ['variant', 'leftIcon', 'rightIcon', 'isDisabled'] as (keyof ButtonProps)[],
        },
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
        leftIcon: <ChevronLeft />,
        variant: 'link',
    },
};

export const AsLink: Story = {
    args: {
        href: '#',
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack className="gap-8">
            {variants.map((variant) => (
                <Stack className="flex-row">
                    <Button {...args} variant={variant}>
                        {variant}
                    </Button>
                    <Button {...args} variant={variant} leftIcon={<ChevronLeft />}>
                        {variant}
                    </Button>
                    <Button {...args} variant={variant} rightIcon={<ChevronRight />}>
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
