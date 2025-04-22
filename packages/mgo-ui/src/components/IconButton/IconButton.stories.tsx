import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { IconButton } from './IconButton';
import { sizes, variants } from './props';

type Story = StoryObj<typeof IconButton>;
type StoryMeta = Meta<typeof IconButton>;

export default {
    component: IconButton,
    args: {
        icon: 'close',
        'aria-label': 'Sluiten',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="gap-10 p-4">
                {variants.map((variant) => (
                    <Stack className="flex-row" key={variant}>
                        {sizes.map((size) => (
                            <IconButton
                                key={`${variant}-${size}`}
                                {...args}
                                variant={variant}
                                size={size}
                            />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </DarkStory>
    ),
};
