import type { Meta, StoryObj } from '@storybook/react';
import { Illustration } from './Illustration';
import { illustrationNames } from './illustrations';
import { Stack } from '../Stack/Stack';

type Story = StoryObj<typeof Illustration>;
type StoryMeta = Meta<typeof Illustration>;

export default {
    component: Illustration,
    args: {
        illustration: 'woman-with-phone',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack className="gap-10">
            {illustrationNames.map((illustration) => (
                <div key={illustration} className="max-w-[300px]">
                    <Illustration {...args} illustration={illustration} />
                    <div className="mt-2 text-center text-xs dark:text-white">{illustration}</div>
                </div>
            ))}
        </Stack>
    ),
};
