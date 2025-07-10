import { fileURLToPath, URL } from 'url';
import { defineProject } from 'vitest/config';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default () =>
    defineProject({
        resolve: {
            alias: {
                $test: resolvePath('./test'),
            },
        },
        test: {
            globalSetup: ['./test/globals.ts'],
            exclude: ['node_modules', 'dist', 'build', 'out-tsc'],
        },
    });
