import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { MobileMenuItem } from './MobileMenuItem';

type Story = StoryObj<typeof MobileMenuItem>;
type StoryMeta = Meta<typeof MobileMenuItem>;

export default {
    component: MobileMenuItem,
    args: {
        children: 'Label',
        icon: 'home',
        onClick: action('on-click'),
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Active: Story = {
    args: {
        'aria-current': 'page',
    },
};

export const List: Story = {
    render: () => (
        <DarkStory>
            <Stack className="gap-0">
                <MobileMenuItem icon="home">Home</MobileMenuItem>
                <MobileMenuItem icon="favorite" aria-current="page">
                    Favorite
                </MobileMenuItem>
                <MobileMenuItem icon="settings">Settings</MobileMenuItem>
            </Stack>
        </DarkStory>
    ),
};
