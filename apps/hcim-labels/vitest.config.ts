import { fileURLToPath, URL } from 'url';
import { defineProject } from 'vitest/config';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default () =>
    defineProject({
        test: {
            include: ['./src/**/*.test.{ts,tsx}'],
        },
    });
