import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { ErrorNotice } from './ErrorNotice';
import { action } from '@storybook/addon-actions';

type Story = StoryObj<typeof ErrorNotice>;
type StoryMeta = Meta<typeof ErrorNotice>;

export default {
    component: ErrorNotice,
    args: {
        heading: 'Heading',
        subHeading: 'SubHeading',
        buttonLabel: 'Label',
        isOpen: true,
        onClick: action('on-click'),
    },
} satisfies StoryMeta;

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <ErrorNotice {...args} />
                <ErrorNotice {...args} />
            </Stack>
        </DarkStory>
    ),
};
