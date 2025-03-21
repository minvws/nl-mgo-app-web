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

const { APP_ENVIRONMENT = 'local', BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = process.env;

const baseUrls = {
    local: 'http://localhost:8000',
    test: 'https://web.test.mgo.irealisatie.nl',
    acc: 'https://web.acc.mgo.irealisatie.nl',
};

if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
    throw new Error(
        'BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set in the environment variables / .env file'
    );
}
if (!Object.keys(baseUrls).includes(APP_ENVIRONMENT)) {
    throw new Error(
        `Invalid APP_ENVIRONMENT provided: "${APP_ENVIRONMENT}". Must be one of: ${Object.keys(baseUrls).join(', ')}`
    );
}

const authToken = btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`);

const outputDir = 'results';

export default defineConfig({
    testDir: './src/tests',
    fullyParallel: true,
    retries: 0,
    reporter: [['html', { outputFolder: outputDir }]],
    outputDir,
    timeout: 10000,

    use: {
        baseURL: baseUrls[APP_ENVIRONMENT],
        trace: 'on-first-retry',
        extraHTTPHeaders: {
            Authorization: `Basic ${authToken}`,
        },
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // Playwright will by default use the operating system as a suffix for the snapshot filename.
    // We disabled this for now so snapshot files created locally will have the same name as in the Docker environment.
    snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
});
