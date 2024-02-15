import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonOrLink, type ButtonOrLinkProps } from './ButtonOrLink';

type Story = StoryObj<typeof ButtonOrLink>;
type StoryMeta = Meta<typeof ButtonOrLink>;

export default {
    component: ButtonOrLink,
    args: {
        children: 'Label',
    },
    parameters: {
        controls: {
            // Normally storybook filters out default HTML props, but it
            // seems to have trouble with the `oneOf` type
            include: ['href'] as (keyof ButtonOrLinkProps)[],
        },
    },
} satisfies StoryMeta;

/** Renders as an `<a>` when an href is given */
export const Link: Story = {
    args: {
        href: '#',
    },
};

/** Renders as a `<button>` when no href is given */
export const Button: Story = {
    args: {
        onClick: action('on-click'),
    },
};
