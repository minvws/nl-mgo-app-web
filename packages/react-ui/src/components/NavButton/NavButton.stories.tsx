import { type Meta, type StoryObj } from '@storybook/react';
import { NavButton } from './NavButton';
import { Stack } from '../Stack/Stack';
import { iconNames } from '../Icon/icons';

type Story = StoryObj<typeof NavButton>;
type StoryMeta = Meta<typeof NavButton>;

export default {
    component: NavButton,
    args: {
        children: 'Label',
        icon: 'Home',
    },
    argTypes: {
        icon: {
            options: iconNames,
        },
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack className="gap-8">
            <NavButton {...args} icon="Home">
                Label
            </NavButton>
            <NavButton {...args} icon="Home" aria-current="page">
                Label
            </NavButton>
        </Stack>
    ),
};
