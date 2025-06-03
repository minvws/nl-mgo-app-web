import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { MarkdownContent } from './MarkdownContent';

type Story = StoryObj<typeof MarkdownContent>;
type StoryMeta = Meta<typeof MarkdownContent>;

export default {
    component: MarkdownContent,
    args: {
        children: (
            <>
                <h1>Markdown HTML Content</h1>
                <p>
                    A component for displaying basic (markdown) html content. With text in{' '}
                    <strong>bold</strong>, <em>italics</em>, and even{' '}
                    <em>
                        italics and later <strong>bold</strong>
                    </em>
                    . Even <del>strikethrough</del>. <a href="https://www.google.com/">A link</a> to
                    somewhere.
                </p>

                <h2>Unordered list</h2>
                <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                </ul>

                <h2>Ordered list</h2>
                <ol>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                </ol>

                <h2>Nested list</h2>
                <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>
                        Perspiciatis optio voluptas
                        <ol>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Consectetur adipiscing elit</li>
                            <li>Integer molestie lorem at massa</li>
                            <li>Facilisis in pretium nisl aliquet</li>
                        </ol>
                    </li>
                    <li>Integer molestie lorem at massa</li>
                </ul>

                <h2>Headings</h2>
                <h1>
                    (h1) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h1>
                <h2>
                    (h2) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h2>
                <h3>
                    (h3) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h3>
                <h4>
                    (h4) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h4>
                <h5>
                    (h5) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h5>
                <h6>
                    (h6) Neque explicabo dicta fuga soluta odio minima laboriosam similique commodi
                    culpa cumque.
                </h6>

                <h2>Blockquote</h2>
                <blockquote>
                    <p>
                        Deleniti voluptate aperiam quis consectetur doloremque temporibus nam maxime
                        incidunt consectetur excepturi vero quae error.
                    </p>
                    <p>
                        Temporibus nisi eum eos itaque officia eius dicta dignissimos quos sequi
                        veniam blanditiis.
                    </p>
                </blockquote>

                <h2>Code content</h2>
                <pre>
                    <code>{`var foo = 'bar';

function baz(s) {
   return foo + ':' + s;
}`}</code>
                </pre>

                <p>
                    Or inline code like <code>var foo = &#39;bar&#39;;</code>.
                </p>

                <p>Or an image</p>
                <p>
                    <img src="https://picsum.photos/id/237/200/300" alt="dog" />
                </p>
            </>
        ),
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory orientation="vertical">
            <MarkdownContent {...args} />
        </DarkStory>
    ),
};
