import type { StorybookConfig } from '@storybook/react-vite';
import { UserConfig, mergeConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

const config: StorybookConfig = {
    stories: ['../**/*.stories.@(mdx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: true,
    },
    // async viteFinal(config) {
    //     const overrideConfig: UserConfig = {
    //         // css: {
    //         //     postcss: path.resolve(__dirname, '../src/postcss.config.js'),
    //         // },
    //         // plugins: [commonjs()],
    //         // build: {
    //         //     commonjsOptions: {
    //         //         include: [/node_modules/, /tailwind/],
    //         //     },
    //         // },
    //     };

    //     return mergeConfig(config, overrideConfig);
    // },
};

export default config;
