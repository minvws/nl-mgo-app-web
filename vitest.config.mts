import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            extension: ['ts', 'tsx'],
            include: ['packages/**', 'apps/*'],
            exclude: [
                'apps/*/test/*',
                'packages/*/test/*',
                'packages/*/docs/*',
                '**/?*.config.ts',
                '**/?*.stories.tsx',
                '**/?*.d.ts',
                '**/.storybook/*',
                '**/__mocks__/*',
                '**/__snapshots__/*',
            ],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
            reporter: ['text', 'lcov'],
        },
    },
});
