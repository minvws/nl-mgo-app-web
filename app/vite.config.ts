/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true,
        },
    },
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            exclude: ['.eslintrc.cjs', '**/*.d.ts', 'src/main.tsx'],
        },
    },
});
