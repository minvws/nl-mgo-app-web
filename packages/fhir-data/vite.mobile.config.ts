import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

// @ts-expect-error module is set to 'esnext' in tsconfig, but this file is not part of the source code
export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/fhir-data/mobile',

    build: {
        target: 'es2021',
        outDir: 'build/js',
        minify: false,
        lib: {
            entry: resolvePath('./src/api/index.ts'),
            name: 'MgoFhirData',
            fileName: 'mgo-fhir-data',
            formats: ['iife'],
        },
    },
});
