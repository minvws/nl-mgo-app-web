import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { iconNames } from './icons';

type Story = StoryObj<typeof Icon>;
type StoryMeta = Meta<typeof Icon>;

export default {
    component: Icon,
    args: {
        icon: 'encrypted',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const WithColorAndSize: Story = {
    render: ({ ...args }) => <Icon {...args} className="text-sky-blue-500 text-4xl" />,
};

export const WithLabel: Story = {
    args: {
        'aria-label': 'label',
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <div className="grid auto-cols-auto auto-rows-auto grid-cols-[repeat(auto-fill,minmax(90px,_1fr))] gap-4 text-center">
            {iconNames.map((name) => (
                <div key={name}>
                    <div className="flex min-h-16 items-center justify-center text-4xl">
                        <Icon {...args} icon={name} />
                    </div>
                    <div className="mt-2 text-base dark:text-white">{name}</div>
                </div>
            ))}
        </div>
    ),
};
