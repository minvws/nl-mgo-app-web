import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '../../utils';
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

export const WithIcon: Story = {
    render: ({ href: _href, ...args }) => (
        <Link {...args} variant="dotted" asChild iconRight="help">
            <button onClick={action('on-click')}>I&apos;m a button with an icon</button>
        </Link>
    ),
};

export const Overview: Story = {
    render: ({ href, ...args }) => (
        <DarkStory>
            {variants.map((variant) => (
                <Stack
                    className={cn(
                        'mb-6 items-start gap-2 p-2',
                        variant === 'inverted' && 'bg-t-cat-rijkslint'
                    )}
                    key={variant}
                >
                    <Link {...{ args }} variant={variant} href={href as string}>
                        As a {variant} link
                    </Link>
                    <Link {...{ args }} variant={variant} href={href as string} iconRight="help">
                        As a {variant} link with an icon
                    </Link>
                    <Link {...args} variant={variant} asChild>
                        <button onClick={action('on-click')}>As a {variant} button</button>
                    </Link>
                    <Link {...args} variant={variant} asChild iconRight="help">
                        <button onClick={action('on-click')}>
                            As a {variant} button with an icon
                        </button>
                    </Link>
                </Stack>
            ))}
        </DarkStory>
    ),
};
