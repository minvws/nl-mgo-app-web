import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { DescriptionNotice } from './DescriptionNotice';
import { variants } from './variants';

type Story = StoryObj<typeof DescriptionNotice>;
type StoryMeta = Meta<typeof DescriptionNotice>;

export default {
    component: DescriptionNotice,
    args: {
        variant: 'info',
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ variant }) => (
        <DescriptionNotice variant={variant}>
            This is a {variant} description notice
            <Button variant="ghost" rightIcon="chevron_right">
                Deploy robot
            </Button>
        </DescriptionNotice>
    ),
};

export const Overview: Story = {
    render: () => (
        <DarkStory>
            <Stack>
                {variants.map((variant) => {
                    return (
                        <DescriptionNotice key={variant} variant={variant}>
                            This is a {variant} description notice
                        </DescriptionNotice>
                    );
                })}
            </Stack>
        </DarkStory>
    ),
};
