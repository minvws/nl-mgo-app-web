import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '.';

const allIconNames = Object.keys(icons);

export default {
    title: 'Icons',
} satisfies Meta;

export const Icon: StoryObj<{ icon: keyof typeof icons }> = {
    args: {
        icon: allIconNames[0] as keyof typeof icons,
    },
    argTypes: {
        icon: {
            control: 'select',
            options: allIconNames,
        },
    },
    render: ({ icon: iconName, ...args }) => {
        const Icon = icons[iconName];
        return <Icon {...args} />;
    },
};

/** Use the text color to change an Icon's fill color */
export const ColoredIcon: StoryObj<{ icon: keyof typeof icons }> = {
    args: {
        icon: allIconNames[0] as keyof typeof icons,
    },
    argTypes: {
        icon: {
            control: 'select',
            options: allIconNames,
        },
    },
    render: ({ icon: iconName, ...args }) => {
        const Icon = icons[iconName];
        return <Icon {...args} className="text-blue-600" />;
    },
};

export const Overview: StoryObj<{ icon: keyof typeof icons }> = {
    parameters: {
        backgrounds: {
            default: 'grey',
            values: [
                {
                    name: 'grey',
                    value: '#F3F3F3',
                },
            ],
        },
    },
    render: () => {
        const allIcons = Object.entries(icons);

        return (
            <div className="grid auto-cols-auto auto-rows-auto grid-cols-[repeat(auto-fill,minmax(90px,_1fr))] gap-4 text-center">
                {allIcons.map(([name, Icon]) => (
                    <div>
                        <div className="text-md flex min-h-16 items-center justify-center rounded-md bg-white shadow-sm">
                            <Icon />
                        </div>
                        <div className="mt-2 text-sm">{name}</div>
                    </div>
                ))}
            </div>
        );
    },
};
