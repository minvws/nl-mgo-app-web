import { type Meta, type StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { NavButton } from './NavButton';
import { menuIconNames } from './icons';

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
            options: menuIconNames,
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
    render: () => (
        <DarkStory>
            <Stack className="items-start gap-8">
                {menuIconNames.map((menuIcon) => (
                    <div key={menuIcon}>
                        <NavButton icon={menuIcon}>Label</NavButton>
                        <NavButton icon={menuIcon} aria-current="page">
                            Label
                        </NavButton>
                    </div>
                ))}
            </Stack>
        </DarkStory>
    ),
};
