import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Breadcrumbs } from './Breadcrumbs';

type Story = StoryObj<typeof Breadcrumbs>;
type StoryMeta = Meta<typeof Breadcrumbs>;

export default {
    tags: ['!autodocs'],
    component: Breadcrumbs,
    args: {
        items: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Us' }],
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overflow: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            {
                label: 'A fugiat architecto similique vero exercitationem nesciunt commodi illum',
                href: '/contact',
            },
            { label: 'AVeryLongWordThatWillOverflowTheBreadcrumb', href: '/blog' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'You are here' },
        ],
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="gap-10 p-4">
                <Breadcrumbs {...args} />
            </Stack>
        </DarkStory>
    ),
};
