import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        {
            directory: '../docs',
            files: '**/*.@(mdx|stories.tsx)',
            titlePrefix: 'Docs',
        },
        {
            directory: '../src/components',
            files: '**/*.stories.tsx',
            titlePrefix: 'Components',
        },
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        'storybook-addon-css-user-preferences',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: true,
    },
};

export default config;
