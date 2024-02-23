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
        <div className="border-grey-500 flex flex-col gap-2 border border-dashed py-4">
            <Container {...args} className="bg-blue-100">
                <div className="inline-block bg-blue-200 p-2">{children}</div>
            </Container>
        </div>
    ),
};

export const CenteredContent: Story = {
    args: {
        centeredContent: true,
    },
    render: ({ children, ...args }) => (
        <div className="border-grey-500 flex flex-col gap-2 border border-dashed py-4">
            <Container {...args} className="bg-blue-100">
                <div className="inline-block bg-blue-200 p-2">{children}</div>
            </Container>
        </div>
    ),
};

/** You can set a container's size via the `max-w-[size]` class. It defaults to `max-w-xl` */
export const SizesOverview: Story = {
    render: () => {
        return (
            <div className="border-grey-500 flex flex-col gap-2 border border-dashed py-4">
                <Container className="max-w-xs bg-blue-100">
                    <div className="min-h-4 bg-blue-300 px-4">max-w-xs</div>
                </Container>
                <Container className="max-w-sm bg-blue-100">
                    <div className="min-h-4 bg-blue-400 px-4">max-w-sm</div>
                </Container>
                <Container className="max-w-md bg-blue-100">
                    <div className="min-h-4 bg-blue-500 px-4">max-w-md</div>
                </Container>
                <Container className="max-w-lg bg-blue-100">
                    <div className="min-h-4 bg-blue-600 px-4 text-white">max-w-lg</div>
                </Container>
                <Container className="max-w-xl bg-blue-100">
                    <div className="min-h-4 bg-blue-700 px-4 text-white">max-w-xl</div>
                </Container>
            </div>
        );
    },
};
