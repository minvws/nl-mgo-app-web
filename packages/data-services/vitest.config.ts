import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        setupFiles: ['./test/setup.ts'],
        chaiConfig: {
            truncateThreshold: 10000,
        },
    },
});
