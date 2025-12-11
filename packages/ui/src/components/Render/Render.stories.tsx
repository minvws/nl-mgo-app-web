import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { Render } from './Render';

type Story = StoryObj<typeof Render>;
type StoryMeta = Meta<typeof Render>;

export default {
    component: Render,
} satisfies StoryMeta;

export const Default: Story = {
    render: () => (
        <Stack className="gap-8">
            <Render>
                <div className="border-sky-blue-500 my-2 border-2 p-4" id="jsx">
                    children as JSX
                </div>
            </Render>

            <Render id="function">
                {({ id }: { id: string }) => (
                    <div className="my-2 border-2 border-green-500 p-4" id={id}>
                        children as function
                    </div>
                )}
            </Render>
        </Stack>
    ),
};
