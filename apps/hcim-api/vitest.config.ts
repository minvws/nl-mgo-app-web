import { defineProject, mergeConfig } from 'vitest/config';
import viteConfig from './vite.api.config';

export default () =>
    mergeConfig(
        viteConfig,
        defineProject({
            test: {
                environment: 'jsdom',
                setupFiles: ['./test/setup.ts'],
                exclude: ['node_modules', 'dist', 'build', 'out-tsc'],
            },
        })
    );
