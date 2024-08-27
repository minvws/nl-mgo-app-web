import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionButton } from './DescriptionButton';

type Story = StoryObj<typeof DescriptionButton>;
type StoryMeta = Meta<typeof DescriptionButton>;

export default {
    component: DescriptionButton,
    args: {
        term: 'Ab maxime',
        details: 'Facere enim similique illo ratione assumenda placeat quas.',
        icon: 'chevron-right',
    },
} satisfies StoryMeta;

export const Default: Story = {};
