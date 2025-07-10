import { createEslintConfig } from '../../eslint.config.base.mjs';

export default [
    ...createEslintConfig({ useReact: true }),
    {
        files: ['.storybook/*.ts', '.storybook/*.tsx', '**/*.stories.tsx'],
        rules: {
            'import/no-default-export': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
        },
    },
];
