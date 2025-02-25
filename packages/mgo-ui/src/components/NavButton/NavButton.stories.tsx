import { type Meta, type StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { iconNames } from '../Icon/icons';
import { Stack } from '../Stack/Stack';
import { NavButton } from './NavButton';

type Story = StoryObj<typeof NavButton>;
type StoryMeta = Meta<typeof NavButton>;

export default {
    component: NavButton,
    args: {
        children: 'Label',
        icon: 'home',
    },
    argTypes: {
        icon: {
            options: iconNames,
        },
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overflow: Story = {
    args: {},
    render: ({ ...args }) => (
        <div className="max-w-[250px] border border-dashed py-6">
            <NavButton {...args} icon="home">
                Quaeratperspiciatisharumreprehenderitfugiatducimusnumquamporroreprehenderitquiundereprehenderitdistinctiovoluptasrecusandae.
            </NavButton>
        </div>
    ),
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="items-start gap-8">
                <NavButton {...args} icon="home">
                    Label
                </NavButton>
                <NavButton {...args} icon="home" aria-current="page">
                    Label
                </NavButton>
            </Stack>
        </DarkStory>
    ),
};
