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
            files: '**/*.@(mdx|stories.tsx)',
            titlePrefix: 'Components',
        },
        {
            directory: '../src/hooks',
            files: '**/*.@(mdx|stories.tsx)',
            titlePrefix: 'Hooks',
        },
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chromatic-com/storybook',
        'storybook-addon-render-modes',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {},
};

export default config;
