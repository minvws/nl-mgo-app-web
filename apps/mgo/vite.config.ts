import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const VITE_SERVER_HOST = 'localhost';

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/mgo',
    build: {
        outDir: './build',
    },
    plugins: [react({ babel: { plugins: ['macros'] } }), svgr()],
    resolve: {
        alias: {
            $: resolvePath('./src'),
            $test: resolvePath('./test'),
        },
    },
    server: {
        host: VITE_SERVER_HOST,
        port: 8000,
        strictPort: true,
        watch: {
            usePolling: true,
        },
        // We try to use the same headers as the production server in order to catch CSP issues early
        headers: {
            'Permissions-Policy': 'interest-cohort=()',
            'Referrer-Policy': 'same-origin',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            'X-Content-Type-Options': 'nosniff',
            'X-DNS-Prefetch-Control': 'off',
            'X-Download-Options': 'noopen',
            'X-Frame-Options': 'sameorigin',
            'X-Permitted-Cross-Domain-Policies': 'none',
            'Content-Security-Policy': [
                `frame-ancestors 'none'`,
                `upgrade-insecure-requests`,
                `block-all-mixed-content`,
                `default-src 'none'`,
                `img-src 'self' data:`,
                `object-src 'none'`,
                `font-src 'self'`,
                `media-src 'none'`,
                `frame-src 'none'`,
                `connect-src https://lo-ad.test.mgo.irealisatie.nl https://dvp-proxy.test.mgo.irealisatie.nl ws://${VITE_SERVER_HOST}:*`,
                `worker-src 'none'`,
                `form-action 'none'`,
                // Unfortunately 'unsafe-inline' is needed as the vite development server uses inline scripts
                `script-src 'self' 'unsafe-inline' ${VITE_SERVER_HOST}:*`,
                `style-src 'self' 'unsafe-inline'`,
            ].join('; '),
        },
    },
});
