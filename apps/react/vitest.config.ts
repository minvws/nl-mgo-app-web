import { defineProject, mergeConfig } from 'vitest/config';
import viteConfig, { resolvePath } from './vite.config';

export default () => {
    /**
     * When running tests from the monorepo root, Lingui will not be able to find the
     * lingui.config.ts file. Setting an absolute path here will fix that.
     */
    process.env.LINGUI_CONFIG = resolvePath('./lingui.config.ts');

    return mergeConfig(
        viteConfig,
        defineProject({
            test: {
                environment: 'jsdom',
                setupFiles: ['./test/setup.ts'],
            },
        })
    );
};
