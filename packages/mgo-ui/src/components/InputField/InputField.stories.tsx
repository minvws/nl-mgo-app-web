import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { InputField } from './InputField';

type Story = StoryObj<typeof InputField>;
type StoryMeta = Meta<typeof InputField>;

export default {
    component: InputField,
    args: {
        label: (
            <>
                Naam <span>(Verplicht)</span>
            </>
        ),
        name: 'name',
        id: 'name',
        required: true,
    },
    argTypes: {
        type: {
            control: 'text',
        },
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        error: 'Vul een naam in',
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <InputField {...args} />
                <InputField {...args} error="Vul een naam in" />
            </Stack>
        </DarkStory>
    ),
};
