import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack/Stack';
import { HealthcareOrganizationCard } from './HealthcareOrganizationCard';
import { Icon } from '../Icon/Icon';

type Story = StoryObj<typeof HealthcareOrganizationCard>;
type StoryMeta = Meta<typeof HealthcareOrganizationCard>;

export default {
    component: HealthcareOrganizationCard,
    args: {
        title: 'Deleniti nisi',
        subTitle: 'Occaecati ab porro numquam repellendus',
        meta: 'Blanditiis aut adipisci alias blanditiis sint',
        icon: 'add',
        iconAriaLabel: 'Add',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Children: Story = {
    args: {
        children: (
            <div className="mt-2 flex items-center gap-2 text-blue-600">
                <Icon icon="check" className="h-7 w-9" />
                Deze zorgaanbieder heb je al toegevoegd
            </div>
        ),
    },
};

export const Variants: Story = {
    args: {},
    render: ({ ...args }) => (
        <Stack>
            <HealthcareOrganizationCard {...args} icon="add" iconAriaLabel="add" />
            <HealthcareOrganizationCard
                {...args}
                icon="chevron-right"
                iconAriaLabel="chevron-right"
            />
            <HealthcareOrganizationCard {...args} icon="delete" iconAriaLabel="delete" />
        </Stack>
    ),
};
