module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:sonarjs/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['import', 'react-refresh', 'sonarjs'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { fixStyle: 'inline-type-imports' },
        ],
    },
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            excludedFiles: [
                '*.stories.tsx',
                'vitest.workspace.ts',
                'vitest.config.ts',
                'vite.config.ts',
            ],
            rules: {
                'import/no-default-export': 'error',
            },
        },
    ],
};
