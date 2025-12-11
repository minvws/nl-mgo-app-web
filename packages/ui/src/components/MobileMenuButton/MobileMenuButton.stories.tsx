import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { MobileMenuButton } from './MobileMenuButton';

type Story = StoryObj<typeof MobileMenuButton>;
type StoryMeta = Meta<typeof MobileMenuButton>;

export default {
    component: MobileMenuButton,
    args: {
        isOpen: false,
        openLabel: 'Open menu',
        closeLabel: 'Sluit menu',
        onClick: action('on-click'),
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="items-baseline">
                <MobileMenuButton {...args} isOpen={false} />
                <MobileMenuButton {...args} isOpen />
            </Stack>
        </DarkStory>
    ),
};
