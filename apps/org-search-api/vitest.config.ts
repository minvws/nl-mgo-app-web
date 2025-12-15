import { defineProject, mergeConfig } from 'vitest/config';
import viteConfig from './vite.api.config';

export default () =>
    mergeConfig(
        viteConfig,
        defineProject({
            test: {
                include: ['./src/**/*.test.{ts,tsx}', './schema-generator/**/*.test.{ts,tsx}'],
            },
        })
    );
