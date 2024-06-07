import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

type Story = StoryObj<typeof Spinner>;
type StoryMeta = Meta<typeof Spinner>;

export default {
    component: Spinner,
} satisfies StoryMeta;

export const Default: Story = {
    render: () => (
        <div className="text-[2rem] text-gray-800">
            <Spinner />
        </div>
    ),
};
