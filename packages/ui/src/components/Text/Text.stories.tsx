import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Text, TextBaseProps } from './Text';
import { sizes } from './sizes';

type Story = StoryObj<TextBaseProps>;
type StoryMeta = Meta<TextBaseProps>;

export default {
    component: Text,
    args: {
        size: 'md',
        children:
            'Natus sunt et optio cumque architecto nihil iure autem quidem possimus veritatis numquam.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

/** use the `as` property to change the element of the Text to another similar element such as `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `span` or `div`. It defaults to `p` */
export const AsText: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Stack className="gap-8">
            <Text {...args} size="lg" as="h3">
                {children}
            </Text>
            <Text {...args} size="md" as="span">
                {children}
            </Text>
        </Stack>
    ),
};

/** use the `asChild` property to change the the tag to something completely different if needed. See [Composition](/docs/docs-composition--docs) for more information. */
export const AsChildText: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Text {...args} size="lg" asChild>
            <button>{children}</button>
        </Text>
    ),
};

export const Overview: Story = {
    render: ({ children, ...args }) => (
        <DarkStory>
            <Stack>
                {[...sizes].reverse().map((size) => (
                    <Text {...args} key={size} size={size}>
                        ({size}) - {children}
                    </Text>
                ))}
            </Stack>
        </DarkStory>
    ),
};
