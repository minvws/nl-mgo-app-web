import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Stack } from '../Stack/Stack';
import { sizes } from './sizes';

type Story = StoryObj<typeof Text>;
type StoryMeta = Meta<typeof Text>;

export default {
    component: Text,
    args: {
        size: 'md',
        children:
            'Natus sunt et optio cumque architecto nihil iure autem quidem possimus veritatis numquam.',
    },
} satisfies StoryMeta;

export const Default: Story = {};

/** use the `asChild` to change the rendered html tag, it defaults to `<p>` */
export const AsChildText: Story = {
    args: {},
    render: ({ children, ...args }) => (
        <Stack className="gap-8">
            <Text {...args} size="lg" asChild>
                <section>{children}</section>
            </Text>
            <Text {...args} size="md" asChild>
                <div>{children}</div>
            </Text>
        </Stack>
    ),
};

export const Overview: Story = {
    render: ({ children, ...args }) => (
        <Stack className="gap-8">
            {[...sizes].reverse().map((size) => (
                <Text {...args} key={size} size={size}>
                    ({size}) {children}
                </Text>
            ))}
        </Stack>
    ),
};
