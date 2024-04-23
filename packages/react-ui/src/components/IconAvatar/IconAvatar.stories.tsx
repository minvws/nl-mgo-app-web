import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { iconColours, type IconName } from '../Icon/icons';
import { IconAvatar } from './IconAvatar';

const iconsWithColors = Object.keys(iconColours) as IconName[];

type Story = StoryObj<typeof IconAvatar>;
type StoryMeta = Meta<typeof IconAvatar>;

export default {
    component: IconAvatar,
    args: {
        icon: 'hospital',
        iconAriaLabel: 'Maiores voluptas rerum',
    },
    argTypes: {
        icon: {
            options: iconsWithColors,
        },
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ icon, ...args }) => (
        <IconAvatar {...args} icon={icon}>
            {icon && <Icon icon={icon} className="h-[1.75em] w-[1.75em]" />}
        </IconAvatar>
    ),
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <div className="grid auto-cols-auto auto-rows-auto grid-cols-[repeat(auto-fill,minmax(90px,_1fr))] gap-4 text-center">
            {iconsWithColors.map((name, index) => (
                <div key={index}>
                    <div className="text-md flex min-h-16 items-center justify-center">
                        <IconAvatar {...args} icon={name} />
                    </div>
                    <div className="mt-2 text-sm dark:text-white">{name}</div>
                </div>
            ))}
            <div>
                <div className="text-md flex min-h-16 items-center justify-center">
                    <IconAvatar icon="encrypted" />
                </div>
                <div className="mt-2 text-sm dark:text-white">Default background</div>
            </div>
        </div>
    ),
};
