import type { Meta, StoryObj } from '@storybook/react';
import { DynamicElement } from './DynamicElement';

type Story = StoryObj<typeof DynamicElement>;
type StoryMeta = Meta<typeof DynamicElement>;

export default {
    component: DynamicElement,
    args: {
        className: 'p-10 bg-blue-500',
    },
    argTypes: {
        as: {
            control: { type: 'text' },
        },
    },
} satisfies StoryMeta;

/** renders as `<div>` by default */
export const Default: Story = {};

export const AsSection: Story = {
    args: {
        as: 'section',
    },
};

export const AsComponent: Story = {
    args: {
        as: (props: React.HTMLAttributes<HTMLElement>) => (
            <div {...props}>It can also render as a different Component</div>
        ),
    },
};
