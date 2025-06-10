import playwright from 'eslint-plugin-playwright';
import { createEslintConfig } from '../../eslint.config.base.mjs';

export default [
    ...createEslintConfig(),
    {
        ...playwright.configs['flat/recommended'],
        files: ['src/**/*.ts'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
        },
    },
];
