import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Notice } from './Notice';
import { variants } from './variants';

type Story = StoryObj<typeof Notice>;
type StoryMeta = Meta<typeof Notice>;

export default {
    component: Notice,
    args: {
        variant: 'info',
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ variant }) => (
        <Notice variant={variant}>
            This is a {variant} notice
            <Button variant="ghost" rightIcon="chevron_right">
                Deploy robot
            </Button>
        </Notice>
    ),
};

export const Overview: Story = {
    render: () => (
        <DarkStory>
            <Stack>
                {variants.map((variant) => {
                    return (
                        <Notice key={variant} variant={variant}>
                            This is a {variant} notice
                        </Notice>
                    );
                })}
            </Stack>
        </DarkStory>
    ),
};
