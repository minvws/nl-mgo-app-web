import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
    ...baseConfig,
    retries: 1,
    forbidOnly: true,
    workers: 10,
    timeout: 60000,
    reporter: [['github'], ['html', { outputFolder: baseConfig.outputDir, open: 'never' }]],
    use: {
        ...baseConfig.use,
        headless: true,
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: {
            mode: 'retain-on-failure',
            size: { width: 1024, height: 576 },
        },
    },
});
