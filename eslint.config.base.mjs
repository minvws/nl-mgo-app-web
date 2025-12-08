// @ts-check
import nx from '@nx/eslint-plugin';
import tanstackQuery from '@tanstack/eslint-plugin-query';
// @ts-ignore
import reactRefresh from 'eslint-plugin-react-refresh';
// @ts-ignore
import tailwindcss from 'eslint-plugin-tailwindcss';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import { fileURLToPath, URL } from 'url';

// @ts-ignore
export const resolvePath = (path) => fileURLToPath(new URL(path, import.meta.url));

/**
 * @typedef {Object} EslintConfigOptions
 * @property {boolean} [useTypeScript] - Whether to use TypeScript configuration
 * @property {boolean} [useReact] - Whether to use React configuration
 */

/**
 * Creates an ESLint configuration based on the provided options
 * @param {EslintConfigOptions} options - Configuration options
 */
export function createEslintConfig({ useTypeScript = true, useReact = false } = {}) {
    /** @type {import('eslint').Linter.Config[]} */
    const config = [];

    config.push(...nx.configs['flat/base']);
    config.push(...nx.configs['flat/javascript']);

    if (useTypeScript) {
        config.push(...nx.configs['flat/typescript']);
    }

    if (useReact) {
        config.push(...nx.configs['flat/react']);
        config.push(...tanstackQuery.configs['flat/recommended']);
    }

    config.push(
        {
            // prettier-ignore
            ignores: [
                '**/docs',
                '**/dist',
                '**/build',
                '**/results',
                '**/out-tsc',
                '**/test-output',
                '*.config.*',
            ],
        },

        {
            files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
            plugins: { sonarjs },
            rules: {
                ...sonarjs.configs.recommended.rules,
                'sonarjs/no-commented-code': 'warn',
                'sonarjs/no-clear-text-protocols': 'off',
                'sonarjs/no-duplicate-string': 'off',
                'sonarjs/no-unused-vars': 'off', // already covered by typescript-eslint
                'sonarjs/no-nested-conditional': 'off',
            },
        },

        {
            // prettier-ignore
            files: [
                '**/*.ts',
                '**/*.tsx',
                '**/*.js',
                '**/*.jsx',
            ],
            plugins: { import: importPlugin },
            ignores: ['packages/fhir-data/schema-generator/*'],
            rules: {
                'no-duplicate-imports': 'error',
                'import/no-default-export': 'error',
                'no-void': 'error',
            },
        }
    );

    if (useReact) {
        config.push({
            files: ['**/*.tsx'],
            plugins: {
                'react-refresh': reactRefresh,
            },
            rules: {
                'react/no-unstable-nested-components': 'error',
                'react/react-in-jsx-scope': 'off',
                'react/jsx-uses-react': 'off',
                'react/prefer-read-only-props': 'error',
                'react/no-array-index-key': 'error',
                'react/jsx-boolean-value': ['error', 'never'],
                'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
                'jsx-a11y/anchor-has-content': 'off',
            },
        });

        config.push({
            files: ['**/*.tsx', '**/*.ts'],
            plugins: { tailwindcss },
            rules: {
                'tailwindcss/no-custom-classname': [
                    'error',
                    { callees: ['cn', 'twMerge'], tags: ['tw'], whitelist: ['dark'] },
                ],
            },
            settings: {
                tailwindcss: {
                    config: resolvePath('./packages/ui/tailwind/theme.css'),
                },
            },
        });
    }

    if (useTypeScript) {
        config.push(
            /** @type {import('eslint').Linter.Config} */
            {
                files: ['**/*.ts', '**/*.tsx'],
                rules: {
                    'no-redeclare': 'off',
                    '@typescript-eslint/no-redeclare': 'error',
                    '@typescript-eslint/no-empty-function': 'off',
                    '@typescript-eslint/no-non-null-assertion': 'off',
                    '@typescript-eslint/no-unused-vars': [
                        'error',
                        {
                            args: 'all',
                            argsIgnorePattern: '^_',
                            caughtErrors: 'all',
                            caughtErrorsIgnorePattern: '^_',
                            destructuredArrayIgnorePattern: '^_',
                            varsIgnorePattern: '^_',
                            ignoreRestSiblings: true,
                        },
                    ],
                },
            }
        );
    }

    config.push({
        // prettier-ignore
        files: [
            'test/**/*.ts',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            '**/*.test.ts',
            '**/*.test.tsx'
        ],
        rules: {
            'no-restricted-globals': 'off',
            'sonarjs/pseudo-random': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
        },
    });

    return config;
}
