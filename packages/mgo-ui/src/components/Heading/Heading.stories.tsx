import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Heading } from './Heading';
import { sizes } from './sizes';

type Story = StoryObj<typeof Heading>;
type StoryMeta = Meta<typeof Heading>;

export default {
    component: Heading,
    args: {
        size: 'md',
        children:
            'Natus sunt et optio cumque architecto nihil iure autem quidem possimus veritatis numquam.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

/** use the `asChild` to change the rendered html tag, it defaults to `<div>` */
export const AsChildHeading: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Stack className="gap-8">
            <Heading {...args} size="lg" asChild>
                <h1>{children}</h1>
            </Heading>
            <Heading {...args} size="md" asChild>
                <h2>{children}</h2>
            </Heading>
        </Stack>
    ),
};

export const Overview: Story = {
    render: ({ children, ...args }) => (
        <DarkStory>
            <Stack className="gap-8">
                {[...sizes].reverse().map((size) => (
                    <Heading {...args} key={size} size={size}>
                        ({size}) {children}
                    </Heading>
                ))}
            </Stack>
        </DarkStory>
    ),
};
