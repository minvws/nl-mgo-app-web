import theme from '@minvws/mgo-tailwind/theme/index.js';

export default {
    content: ['./**/*.{ts,tsx,mdx}', '.storybook/*.{ts,tsx,mdx}'],
    theme,
    darkMode: [
        'variant',
        ['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)'],
    ],
};
