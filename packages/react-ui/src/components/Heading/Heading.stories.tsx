import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Stack } from '../Stack/Stack';
import { sizes } from './sizes';

type Story = StoryObj<typeof Heading>;
type StoryMeta = Meta<typeof Heading>;

export default {
    component: Heading,
    args: {
        size: 'md',
        children:
            'Natus sunt et optio cumque architecto nihil iure autem quidem possimus veritatis numquam.',
    },
    argTypes: {
        as: {
            control: { type: 'text' },
        },
    },
} satisfies StoryMeta;

/** renders as `<div>` by default */
export const Default: Story = {};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack className="gap-8">
            {sizes.map((size) => (
                <Heading {...args} key={size} size={size} />
            ))}
        </Stack>
    ),
};
