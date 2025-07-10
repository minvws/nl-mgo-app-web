import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Spinner } from './Spinner';
import { variants } from './variants';

type Story = StoryObj<typeof Spinner>;
type StoryMeta = Meta<typeof Spinner>;

export default {
    component: Spinner,
} satisfies StoryMeta;

export const Default: Story = {
    render: () => <Spinner />,
};
export const Sizing: Story = {
    render: () => (
        <Stack className="flex-row">
            <Spinner className="size-6" />
            <Spinner className="size-8" />
            <Spinner className="size-10" />
        </Stack>
    ),
};

export const Overview: Story = {
    render: () => (
        <DarkStory>
            <Stack className="flex-row">
                {variants.map((variant) => (
                    <div key={variant} className="flex flex-col items-center">
                        <Spinner variant={variant} />
                        <span>{variant}</span>
                    </div>
                ))}
            </Stack>
        </DarkStory>
    ),
};
