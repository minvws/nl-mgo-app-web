import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { HealthcareOrganizationCard } from './HealthcareOrganizationCard';

type Story = StoryObj<typeof HealthcareOrganizationCard>;
type StoryMeta = Meta<typeof HealthcareOrganizationCard>;

export default {
    component: HealthcareOrganizationCard,
    args: {
        title: 'Deleniti nisi',
        subTitle: 'Occaecati ab porro numquam repellendus',
        meta: 'Blanditiis aut adipisci alias blanditiis sint',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Messages: Story = {
    args: {
        infoMessage:
            'infoMessage Laborum reprehenderit explicabo animi soluta totam non eligendi veritatis temporibus.',
        checkMessage:
            'checkMessage Quis quas debitis voluptate ad doloribus error non asperiores esse architecto beatae aliquam aspernatur.',
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <HealthcareOrganizationCard {...args} />
                <HealthcareOrganizationCard
                    {...args}
                    infoMessage="infoMessage Laborum reprehenderit explicabo animi soluta totam non eligendi veritatis temporibus."
                />
                <HealthcareOrganizationCard
                    {...args}
                    checkMessage="checkMessage lorem ipsum"
                    icon="chevron-right"
                    iconAriaLabel="chevron-right"
                    onActionClick={action('on-action-click')}
                />
                <HealthcareOrganizationCard
                    {...args}
                    icon="add"
                    iconAriaLabel="add"
                    onActionClick={action('on-action-click')}
                />
                <HealthcareOrganizationCard
                    {...args}
                    icon="chevron-right"
                    iconAriaLabel="chevron-right"
                    onActionClick={action('on-action-click')}
                />
                <HealthcareOrganizationCard
                    {...args}
                    icon="delete"
                    iconAriaLabel="delete"
                    onActionClick={action('on-action-click')}
                />
            </Stack>
        </DarkStory>
    ),
};
