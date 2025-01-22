import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { Environment, environmentConfig } from './src/environment';

dotenv.config({ override: true });

const envConfig = environmentConfig[process.env.APP_ENVIRONMENT as Environment];

export default defineConfig({
    testDir: './src/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: envConfig.baseUrl,
        trace: 'on-first-retry',
        // screenshot: 'on',
        colorScheme: 'dark',
        launchOptions: {
            slowMo: 50,
        },
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12 Pro'] },
        },
    ],
});
