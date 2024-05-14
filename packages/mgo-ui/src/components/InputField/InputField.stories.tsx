import type { Meta, StoryObj } from '@storybook/react';
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
