import type { Meta, StoryObj } from '@storybook/react';
import { IconAvatar } from './IconAvatar';
import { defaultIconColorIconNames } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

type Story = StoryObj<typeof IconAvatar>;
type StoryMeta = Meta<typeof IconAvatar>;

export default {
    component: IconAvatar,
    args: {
        name: 'Hospital',
    },
    argTypes: {
        name: {
            options: defaultIconColorIconNames,
        },
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ name, ...args }) => (
        <IconAvatar {...args} name={name}>
            {name && <Icon name={name} className="h-[1.75em] w-[1.75em]" />}
        </IconAvatar>
    ),
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <div className="grid auto-cols-auto auto-rows-auto grid-cols-[repeat(auto-fill,minmax(90px,_1fr))] gap-4 text-center">
            {defaultIconColorIconNames.map((name, index) => (
                <div key={index}>
                    <div className="text-md flex min-h-16 items-center justify-center">
                        <IconAvatar {...args} name={name} />
                    </div>
                    <div className="mt-2 text-sm dark:text-white">{name}</div>
                </div>
            ))}
            <div>
                <div className="text-md flex min-h-16 items-center justify-center">
                    <IconAvatar name="Encrypted" />
                </div>
                <div className="mt-2 text-sm dark:text-white">Default background</div>
            </div>
        </div>
    ),
};
