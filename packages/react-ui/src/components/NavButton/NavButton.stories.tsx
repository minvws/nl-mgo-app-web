import { type Meta, type StoryObj } from '@storybook/react';
import { NavButton } from './NavButton';
import { Stack } from '../Stack/Stack';
import { variants } from './variants';
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
            {variants.map((variant, index) => (
                <Stack className="flex-row" key={index}>
                    <NavButton {...args} variant={variant} icon="Home">
                        {variant}
                    </NavButton>
                    <NavButton {...args} variant={variant} icon="Home" aria-current="page">
                        {variant}
                    </NavButton>
                </Stack>
            ))}
        </Stack>
    ),
};
