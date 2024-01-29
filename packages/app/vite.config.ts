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
        setupFiles: ['./test/setup.ts'],
        coverage: {
            provider: 'v8',
            exclude: [
                '.eslintrc.cjs',
                '**/*.d.ts',
                'src/main.tsx',
                'public/config.js',
                '__mocks__/*',
            ],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
});
