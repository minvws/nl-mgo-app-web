import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/mgo-hcim-api/api',

    build: {
        target: 'es2021',
        minify: false,
        lib: {
            entry: resolvePath('./src/index.ts'),
            name: 'HcimApi',
            fileName: 'mgo-hcim-api',
            formats: ['iife'],
        },
    },
});
