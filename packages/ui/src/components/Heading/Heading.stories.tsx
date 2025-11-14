import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Heading, HeadingBaseProps } from './Heading';
import { sizes } from './sizes';

type Story = StoryObj<HeadingBaseProps>;
type StoryMeta = Meta<HeadingBaseProps>;

export default {
    component: Heading,
    args: {
        size: 'md',
        children:
            'Natus sunt et optio cumque architecto nihil iure autem quidem possimus veritatis numquam.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

/** use the `as` property to change the level of the heading such as `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `span` or `div`. It defaults to `div` */
export const AsHeading: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Stack className="gap-8">
            <Heading {...args} size="lg" as="h3">
                {children}
            </Heading>
            <Heading {...args} size="md" as="h5">
                {children}
            </Heading>
        </Stack>
    ),
};

/** use the `asChild` property to change the the tag to something completely different if needed. See [Composition](/docs/docs-composition--docs) for more information. */
export const AsChildHeading: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Heading {...args} size="lg" asChild>
            <button>{children}</button>
        </Heading>
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
