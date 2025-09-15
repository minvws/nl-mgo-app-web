import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Button } from './Button';
import { variants } from './variants';

type Story = StoryObj<typeof Button>;
type StoryMeta = Meta<typeof Button>;

export default {
    tags: ['!autodocs'],
    component: Button,
    args: {
        children: 'Label',
        onClick: action('on-click'),
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const FullWidth: Story = {
    args: {
        className: 'w-full',
    },
};

export const WithIcon: Story = {
    args: {
        variant: 'ghost',
    },
    render: ({ ...args }) => (
        <Stack className="flex-row">
            <Button {...args} variant={args.variant} leftIcon="chevron-left">
                With icon
            </Button>
        </Stack>
    ),
};

export const AsChildLink: Story = {
    render: ({ onClick: _onClick, ...args }) => (
        <Button {...args} variant={args.variant} leftIcon="chevron-left" asChild>
            <a href="#foo">I&apos;m a link</a>
        </Button>
    ),
};

export const Loading: Story = {
    render: ({ onClick: _onClick, ...args }) => {
        const [loading, setLoading] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks

        return (
            <div>
                <Button onClick={() => setLoading(!loading)} variant="outline">
                    Turn loading {loading ? 'off' : 'on'}
                </Button>

                <Stack className="my-8 items-start gap-4">
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                    >
                        Without icon
                    </Button>
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                        loadingSpinnerOnly
                    >
                        Spinner only
                    </Button>
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        leftIcon="chevron-left"
                        loadingTextScreenReader="We are loading"
                        loadingSpinnerOnly
                    >
                        Left icon - spinner only
                    </Button>
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                        leftIcon="chevron-left"
                    >
                        Left icon
                    </Button>
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                        rightIcon="chevron-right"
                    >
                        Right icon
                    </Button>
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                        leftIcon="add"
                        rightIcon="chevron-right"
                        fullWidth
                    >
                        Both icons - fullWidth
                    </Button>
                </Stack>
            </div>
        );
    },
};

export const LoadingSimulation: Story = {
    render: ({ onClick: _onClick, ...args }) => {
        const [loading, setLoading] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks

        const simulateLoading = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        };

        return (
            <div>
                <Stack className="my-8 items-start gap-4">
                    <Button
                        {...args}
                        variant={args.variant}
                        loading={loading}
                        loadingTextScreenReader="We are making a sandwich"
                        onClick={simulateLoading}
                    >
                        Make a sandwich
                    </Button>
                </Stack>
            </div>
        );
    },
};

export const Overview: Story = {
    args: {},
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="gap-10 p-4">
                {variants.map((variant) => (
                    <Stack className="flex-col items-start" key={variant}>
                        <Button {...args} variant={variant}>
                            {variant}
                        </Button>
                        <Button
                            {...args}
                            variant={variant}
                            loading
                            loadingTextScreenReader="We are loading"
                        >
                            {variant}
                        </Button>
                        <Button {...args} variant={variant} leftIcon="chevron-left">
                            {variant}
                        </Button>
                        <Button {...args} variant={variant} rightIcon="chevron-right">
                            {variant}
                        </Button>
                        <Button {...args} fullWidth variant={variant} rightIcon="chevron-right">
                            {variant} - fullWidth
                        </Button>
                    </Stack>
                ))}
            </Stack>
        </DarkStory>
    ),
};
