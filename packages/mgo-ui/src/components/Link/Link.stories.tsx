import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Link } from './Link';
import { variants } from './variants';

type Story = StoryObj<typeof Link>;
type StoryMeta = Meta<typeof Link>;

export default {
    tags: ['!autodocs'],
    component: Link,
    args: {
        children: 'Label',
        href: '#',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const InlineWithText: Story = {
    render: ({ ...args }) => (
        <p className="gap-8">
            Ad repellat ea iste laudantium cum id eligendi. Nemo quae placeat ab natus dolore{' '}
            <Link {...args}>praesentium voluptatibus</Link> provident modi cupiditate. Quibusdam
            quos ex est ad soluta quasi voluptas. Sed exercitationem sapiente facilis commodi labore
            nulla quae facilis. Impedit nulla reprehenderit dolores quis qui omnis commodi.
        </p>
    ),
};

export const AsChildButton: Story = {
    render: ({ href: _href, ...args }) => (
        <Link {...args} asChild>
            <button onClick={action('on-click')}>I&apos;m a button</button>
        </Link>
    ),
};

export const Overview: Story = {
    render: ({ href, ...args }) => (
        <DarkStory>
            {variants.map((variant) => (
                <Stack className="items-start" key={variant}>
                    <p className="gap-8">
                        Ad repellat ea iste laudantium cum id eligendi. Nemo quae placeat ab natus
                        dolore{' '}
                        <Link variant={variant} href={href as string} {...{ args }}>
                            praesentium voluptatibus
                        </Link>{' '}
                        provident modi cupiditate. Quibusdam quos ex est ad soluta quasi voluptas.
                        Sed exercitationem sapiente facilis commodi labore nulla quae facilis.
                        Impedit nulla reprehenderit dolores quis qui omnis commodi.
                    </p>
                    <Link {...args} asChild>
                        <button onClick={action('on-click')}>I&apos;m a button</button>
                    </Link>
                </Stack>
            ))}
        </DarkStory>
    ),
};
