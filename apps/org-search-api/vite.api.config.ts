import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/mgo-org-search-api/api',

    build: {
        target: 'es2021',
        minify: false,
        lib: {
            entry: resolvePath('./src/index.ts'),
            name: 'OrgSearchApi',
            fileName: 'mgo-org-search-api',
            formats: ['iife'],
        },
    },
});
