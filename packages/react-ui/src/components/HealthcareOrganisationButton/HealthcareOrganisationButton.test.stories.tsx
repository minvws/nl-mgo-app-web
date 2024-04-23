import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { HealthcareOrganisationButton } from './HealthcareOrganisationButton';

type Story = StoryObj<typeof HealthcareOrganisationButton>;
type StoryMeta = Meta<typeof HealthcareOrganisationButton>;

export default {
    component: HealthcareOrganisationButton,
    args: {
        title: 'Deleniti nisi',
        subTitle: 'Occaecati ab porro numquam repellendus',
        meta: 'Blanditiis aut adipisci alias blanditiis sint',
        icon: 'add',
        iconAriaLabel: 'Add',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Variants: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack>
            <HealthcareOrganisationButton {...args} icon="add" iconAriaLabel="add" />
            <HealthcareOrganisationButton {...args} icon="delete" iconAriaLabel="delete" />
        </Stack>
    ),
};
