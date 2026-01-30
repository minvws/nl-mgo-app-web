import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            include: ['packages/*/src/**/*.{ts,tsx}', 'apps/*/src/**/*.{ts,tsx}'],
            exclude: [
                'apps/hcim-api/**',
                'apps/mgo-e2e/**',
                'apps/*/test/*',
                'apps/mgo/public/**',
                'packages/*/test/*',
                'packages/*/docs/*',
                'packages/fhir-data/resource-labels/*',
                'packages/fhir-data/schema-generator/*',
                'packages/hcim-labels/**',
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
        projects: ['apps/*/vitest.config.ts', 'packages/*/vitest.config.ts'],
    },
});
