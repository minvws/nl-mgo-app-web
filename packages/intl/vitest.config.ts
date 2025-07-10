import { defineProject } from 'vitest/config';

export default () =>
    defineProject({
        test: {
            exclude: ['node_modules', 'dist', 'build', 'out-tsc'],
        },
    });
