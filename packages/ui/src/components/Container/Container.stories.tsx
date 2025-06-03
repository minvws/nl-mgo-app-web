import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

type Story = StoryObj<typeof Container>;
type StoryMeta = Meta<typeof Container>;

export default {
    component: Container,
    args: {
        className: 'max-w-xl',
        children:
            'Officiis ullam voluptatem quo sit quidem possimus fugiat corrupti similique odio.',
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ children, ...args }) => (
        <div className="flex flex-col gap-2 border border-dashed border-gray-500 py-4">
            <Container {...args} className="bg-sky-blue-100">
                <div className="bg-sky-blue-200 inline-block p-2">{children}</div>
            </Container>
        </div>
    ),
};

export const CenteredContent: Story = {
    args: {
        centeredContent: true,
    },
    render: ({ children, ...args }) => (
        <div className="flex flex-col gap-2 border border-dashed border-gray-500 py-4">
            <Container {...args} className="bg-sky-blue-100">
                <div className="bg-sky-blue-200 inline-block p-2">{children}</div>
            </Container>
        </div>
    ),
};

/** You can set a container's size via the `max-w-[size]` class. It defaults to `max-w-xl` */
export const SizesOverview: Story = {
    render: () => {
        return (
            <div className="flex flex-col gap-2 border border-dashed border-gray-500 py-4">
                <Container className="bg-sky-blue-100 max-w-xs">
                    <div className="bg-sky-blue-300 min-h-4 px-4">max-w-xs</div>
                </Container>
                <Container className="bg-sky-blue-100 max-w-sm">
                    <div className="bg-sky-blue-500 min-h-4 px-4">max-w-sm</div>
                </Container>
                <Container className="bg-sky-blue-100 max-w-md">
                    <div className="bg-sky-blue-500 min-h-4 px-4">max-w-md</div>
                </Container>
                <Container className="bg-sky-blue-100 max-w-lg">
                    <div className="min-h-4 px-4 text-white">max-w-lg</div>
                </Container>
                <Container className="bg-sky-blue-100 max-w-xl">
                    <div className="bg-dark-blue-700 min-h-4 px-4 text-white">max-w-xl</div>
                </Container>
            </div>
        );
    },
};
