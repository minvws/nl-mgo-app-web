import { defineProject, mergeConfig } from 'vitest/config';

import configShared from './vite.config';

export default mergeConfig(
    configShared,
    defineProject({
        test: {
            environment: 'jsdom',
            setupFiles: ['./test/setup.ts'],
        },
    })
);
