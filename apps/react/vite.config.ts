import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { lingui } from '@lingui/vite-plugin';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ babel: { plugins: ['macros'] } }),
        lingui({
            configPath: resolvePath('./lingui.config.ts'),
        }),
        svgr(),
    ],
    resolve: {
        alias: {
            $: resolvePath('./src'),
            $test: resolvePath('./test'),
        },
    },
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true,
        },
    },
});
