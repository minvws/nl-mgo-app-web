import { type Page } from '@playwright/test';

export async function setOnboardingSeen(page: Page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('onboarding_seen', new Date().toISOString());
    });
}
