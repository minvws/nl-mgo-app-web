import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            extension: ['ts', 'tsx'],
            include: ['packages/**', 'apps/**'],
            exclude: [
                'apps/e2e-tests/**',
                'apps/*/test/*',
                'apps/mgo/public/**',
                'packages/*/test/*',
                'packages/*/docs/*',
                'packages/fhir-data/resource-labels/*',
                'packages/fhir-data/schema-generator/*',
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
