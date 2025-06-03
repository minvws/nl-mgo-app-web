import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { DescriptionButton } from './DescriptionButton';
import { variants } from './variants';

type Story = StoryObj<typeof DescriptionButton>;
type StoryMeta = Meta<typeof DescriptionButton>;

export default {
    component: DescriptionButton,
    args: {
        term: 'Ab maxime',
        details: 'Facere enim similique illo.',
        icon: 'chevron-right',
        isLoading: false,
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Overview: Story = {
    render: (args) => {
        return (
            <DarkStory>
                <Stack>
                    <Stack className="gap-0">
                        {variants.map((variant) => (
                            <DescriptionButton
                                key={variant}
                                {...args}
                                term={variant}
                                variant={variant}
                            />
                        ))}
                    </Stack>
                    <Stack className="gap-0">
                        {variants.map((variant) => (
                            <DescriptionButton
                                key={variant}
                                {...args}
                                term={variant}
                                variant={variant}
                                isLoading
                                loadingText="Bezig met laden..."
                            />
                        ))}
                    </Stack>
                </Stack>
            </DarkStory>
        );
    },
};
