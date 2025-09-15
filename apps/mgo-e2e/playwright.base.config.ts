import { defineConfig, devices } from '@playwright/test';
import { config as dotEnvConfig } from 'dotenv';
import { register as registerEsbuildLoader } from 'esbuild-register/dist/node';

dotEnvConfig({ override: true });

/**
 * Register esbuild for transpiling TypeScript files.
 * Without this registration, we will not be able to use TypeScript files
 * that are directly imported from other packages in this monorepo.
 */
registerEsbuildLoader();

const baseUrls = {
    local: 'http://localhost:8000',
    test: 'https://web.test.mgo.irealisatie.nl',
    acc: 'https://web.acc.mgo.irealisatie.nl',
};

export function createConfig(appEnv: keyof typeof baseUrls) {
    const { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = process.env;

    if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
        throw new Error('BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set');
    }

    if (!Object.keys(baseUrls).includes(appEnv)) {
        throw new Error(`Invalid APP_ENVIRONMENT: ${appEnv}`);
    }

    console.log(`>> Using baseURL: ${baseUrls[appEnv]} (Environment: ${appEnv})`);

    const authToken = Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`).toString('base64');

    const outputDir = 'results';

    return defineConfig({
        testDir: './src/tests',
        fullyParallel: true,
        retries: 0,
        reporter: [['html', { outputFolder: outputDir, open: 'never' }]],
        outputDir,
        timeout: 20000,

        use: {
            baseURL: baseUrls[appEnv],
            trace: 'on-first-retry',
            extraHTTPHeaders: {
                Authorization: `Basic ${authToken}`,
            },
            ignoreHTTPSErrors: true,
            bypassCSP: true,
            launchOptions: {
                args: [
                    '--allow-running-insecure-content',
                    '--disable-web-security',
                    '--ignore-certificiate-errors',
                    '--disable-features=BlockInsecurePrivateNetworkRequests',
                    '--disable-ipv6',
                    '--no-sandbox',
                ],
                //slowMo: 500,
            },
        },

        projects: [
            {
                name: 'chromium',
                use: { ...devices['Desktop Chrome'] },
            },
        ],

        /**
         * Playwright will by default use the operating system as a suffix for the snapshot filename.
         * We disabled this for now so snapshot files created locally will have the same name as in the Docker environment.
         */
        snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
    });
}
