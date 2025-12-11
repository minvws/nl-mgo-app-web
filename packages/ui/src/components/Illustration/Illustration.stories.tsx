import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { Illustration } from './Illustration';
import { illustrationNames } from './illustrations';

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
        <Stack className="w-full flex-col gap-0">
            {illustrationNames.map((illustration) => (
                <Stack className="flex-row gap-0 border-b border-b-gray-500" key={illustration}>
                    <div className="w-1/2 grow bg-[#F5F5F5] text-black">
                        <div className="max-w-[300px] p-6">
                            <Illustration {...args} illustration={illustration} />
                            <div className="mt-2 text-center text-base dark:text-white">
                                {illustration}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 grow bg-[#050505] text-white">
                        <div className="max-w-[300px] p-6">
                            <Illustration {...args} illustration={illustration} forceDarkMode />
                            <div className="mt-2 text-center text-base dark:text-white">
                                {illustration}
                            </div>
                        </div>
                    </div>
                </Stack>
            ))}
        </Stack>
    ),
};
