import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { DescriptionNotice } from './DescriptionNotice';

type Story = StoryObj<typeof DescriptionNotice>;
type StoryMeta = Meta<typeof DescriptionNotice>;

export default {
    component: DescriptionNotice,
    args: {
        icon: 'info-fill',
        iconClassName: 'fill-dark-blue-700',
        children: 'This is a description',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ icon, iconClassName, children }) => (
        <DarkStory>
            <DescriptionNotice icon={icon} iconClassName={iconClassName}>
                {children}
            </DescriptionNotice>
        </DarkStory>
    ),
};
