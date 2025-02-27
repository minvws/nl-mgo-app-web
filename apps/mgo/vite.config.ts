import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({ babel: { plugins: ['macros'] } }), svgr()],
    resolve: {
        alias: {
            $: resolvePath('./src'),
            $test: resolvePath('./test'),
        },
    },
    server: {
        host: true,
        port: 8000,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
});
