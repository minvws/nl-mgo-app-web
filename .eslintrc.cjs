const configFiles = [
    'vitest.workspace.mts',
    '*.config.mts',
    '*.config.ts',
    '*.config.*.ts',
    '*.config.js',
    'packages/mgo-ui/docs/*',
    'packages/fhir-data/schema-generator/*',
];

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:sonarjs/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'react-refresh', 'sonarjs'],
    settings: {
        react: { version: '18' },
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/prefer-read-only-props': 'error',
        'react/no-array-index-key': 'error',
        'react/jsx-boolean-value': ['error', 'never'],
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-duplicate-imports': 'error',
        'sonarjs/no-duplicate-string': 'off',
        'import/no-default-export': 'error',
        'no-void': 'error',
    },
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            excludedFiles: configFiles,
            parserOptions: { project: true },
            rules: {
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-duplicate-type-constituents': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/prefer-nullish-coalescing': [
                    'error',
                    {
                        ignoreConditionalTests: true,
                        ignoreMixedLogicalExpressions: true,
                        ignorePrimitives: {
                            boolean: true,
                        },
                    },
                ],
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    { fixStyle: 'inline-type-imports' },
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        args: 'all',
                        argsIgnorePattern: '^_',
                        caughtErrors: 'all',
                        caughtErrorsIgnorePattern: '^_',
                        destructuredArrayIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                        ignoreRestSiblings: false,
                    },
                ],
            },
        },
        {
            files: ['*.stories.tsx', ...configFiles],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
};
