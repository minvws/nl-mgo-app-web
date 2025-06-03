import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenuItem } from './MobileMenuItem';
import { Stack } from '../Stack/Stack';

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
        <Stack className="gap-0">
            <MobileMenuItem icon="home">Home</MobileMenuItem>
            <MobileMenuItem icon="favorite" aria-current="page">
                Favorite
            </MobileMenuItem>
            <MobileMenuItem icon="settings">Settings</MobileMenuItem>
        </Stack>
    ),
};
