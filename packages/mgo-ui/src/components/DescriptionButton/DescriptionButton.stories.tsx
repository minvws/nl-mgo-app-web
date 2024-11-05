import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionButton } from './DescriptionButton';
import { Stack } from '../Stack/Stack';
import { variants } from './variants';

type Story = StoryObj<typeof DescriptionButton>;
type StoryMeta = Meta<typeof DescriptionButton>;

export default {
    component: DescriptionButton,
    args: {
        term: 'Ab maxime',
        details: 'Facere enim similique illo ratione assumenda placeat quas.',
        icon: 'chevron-right',
        isLoading: false,
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const Variants: Story = {
    render: (args) => {
        return (
            <Stack>
                <Stack className="gap-0">
                    {variants.map((variant) => (
                        <DescriptionButton key={variant} {...args} variant={variant} />
                    ))}
                </Stack>
                <Stack className="gap-0">
                    {variants.map((variant) => (
                        <DescriptionButton
                            key={variant}
                            {...args}
                            variant={variant}
                            isLoading
                            loadingText="Bezig met laden..."
                        />
                    ))}
                </Stack>
            </Stack>
        );
    },
};
