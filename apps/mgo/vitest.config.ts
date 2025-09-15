import { defineProject, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default () =>
    mergeConfig(
        viteConfig,
        defineProject({
            test: {
                environment: 'jsdom',
                setupFiles: ['./test/setup.ts'],
                include: ['./src/**/*.test.{ts,tsx}'],
            },
        })
    );
