import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Link, type LinkProps } from './Link';

type Story = StoryObj<typeof Link>;
type StoryMeta = Meta<typeof Link>;

export default {
    component: Link,
    args: {
        children: 'Label',
    },
    parameters: {
        controls: {
            // Normally storybook filters out default HTML props, but it seems to
            // have trouble with the `oneOf` type of the `ButtonOrLink` component.
            include: ['href'] as (keyof LinkProps)[],
        },
    },
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        href: '#',
    },
};

export const InlineWithText: Story = {
    args: {
        href: '#',
    },
    render: ({ ...args }) => (
        <p className="gap-8">
            Ad repellat ea iste laudantium cum id eligendi. Nemo quae placeat ab natus dolore{' '}
            <Link {...args}>praesentium voluptatibus</Link> provident modi cupiditate. Quibusdam
            quos ex est ad soluta quasi voluptas. Sed exercitationem sapiente facilis commodi labore
            nulla quae facilis. Impedit nulla reprehenderit dolores quis qui omnis commodi.
        </p>
    ),
};

/** If no `href` is passed, it will render as a `<button>` */
export const AsButton: Story = {
    args: {
        onClick: action('on-click'),
    },
};
