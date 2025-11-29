import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { OrganizationButton } from './OrganizationButton';

type Story = StoryObj<typeof OrganizationButton>;
type StoryMeta = Meta<typeof OrganizationButton>;

export default {
    component: OrganizationButton,
    args: {
        title: 'title',
        subTitle: 'subTitle',
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overflow: Story = {
    render: () => (
        <div>
            <OrganizationButton
                title="Suntexplicabodoloresimpeditquoerroreaporrotemporibus. Pariaturaliquidquoquasvoluptatibusipsamsitasperioresautem"
                subTitle="Pariaturaliquidquoquasvoluptatibusipsamsitasperioresautem. Suntexplicabodoloresimpeditquoerroreaporrotemporibus"
            />
        </div>
    ),
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <OrganizationButton {...args} />
                <OrganizationButton {...args} infoMessage="infoMessage" />
                <OrganizationButton {...args} successMessage="successMessage" />
                <OrganizationButton {...args} disabled />
                <OrganizationButton {...args} disabled infoMessage="infoMessage" />
                <OrganizationButton {...args} disabled successMessage="successMessage" />
            </Stack>
        </DarkStory>
    ),
};
