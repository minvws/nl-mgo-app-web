import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { iconNames } from './icons';
import { faker } from '@faker-js/faker';

type Story = StoryObj<typeof Icon>;
type StoryMeta = Meta<typeof Icon>;

export default {
    component: Icon,
    args: {
        name: 'Encrypted',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const WithColorAndSizeFromParent: Story = {
    render: ({ ...args }) => (
        <div className="text-4xl text-blue-400">
            <Icon {...args} />
        </div>
    ),
};

export const WithLabel: Story = {
    args: {
        label: faker.word.sample(),
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <div className="grid auto-cols-auto auto-rows-auto grid-cols-[repeat(auto-fill,minmax(90px,_1fr))] gap-4 text-center">
            {iconNames.map((name, index) => (
                <div key={index}>
                    <div className="text-md flex min-h-16 items-center justify-center">
                        <Icon {...args} name={name} />
                    </div>
                    <div className="mt-2 text-sm">{name}</div>
                </div>
            ))}
        </div>
    ),
};
