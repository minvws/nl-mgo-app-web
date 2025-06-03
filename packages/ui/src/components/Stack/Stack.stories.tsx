import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

type Story = StoryObj<typeof Stack>;
type StoryMeta = Meta<typeof Stack>;

export default {
    component: Stack,
} satisfies StoryMeta;

const Template: Story = {
    render: (args) => (
        <Stack {...args}>
            <div className="bg-sky-blue-100 p-4">1</div>
            <div className="bg-sky-blue-300 p-4">2</div>
            <div className="bg-sky-blue-500 p-4">3</div>
        </Stack>
    ),
};

export const Default: Story = {
    ...Template,
};

/** The stack can be set horizontally using the `flex-row` class */
export const Horizontal: Story = {
    ...Template,
    args: {
        className: 'flex-row',
    },
};
