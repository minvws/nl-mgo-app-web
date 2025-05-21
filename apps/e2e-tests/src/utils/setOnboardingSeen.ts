import { type Page } from '@playwright/test';

/**
 * This function sets the onboarding_seen flag in local storage.
 * This ensures you won't be redirected to the onboarding page.
 * Call this function at the start of your test.
 */
export async function setOnboardingSeen(page: Page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('onboarding_seen', new Date().toISOString());
    });
}
