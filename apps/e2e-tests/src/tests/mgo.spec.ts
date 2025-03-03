import { test, expect } from '@playwright/test';

test.describe('Visit the MGO page', () => {
    test('has title', async ({ page }) => {
        await page.goto('/welkom');
        await expect(page).toHaveTitle(/Mijn Gezondheidsoverzicht/);
    });

    test('visit Privacyverklaring', async ({ page }) => {
        await page.goto('/welkom');

        await page.getByRole('link', { name: 'Volgende' }).click();
        await expect(page).toHaveTitle(/Zo gebruikt de website jouw gegevens/);

        await page.getByRole('link', { name: 'privacyverklaring' }).click();
        await expect(page.getByRole('heading', { level: 1 })).toContainText(
            /Privacyverklaring Mijn Gezondheidsoverzicht/
        );

        await page.getByRole('button', { name: 'Vorige' }).click();
        await expect(page).toHaveURL(/.*hoe-werkt-het/);
    });

    test('Inloggen met DigiD', async ({ page }) => {
        await page.goto('/hoe-werkt-het');

        await page.getByRole('link', { name: 'Volgende' }).click();
        await expect(page).toHaveTitle(/Bewijs wie je bent/);

        await page.getByRole('button', { name: 'Log in met DigiD' }).click();
        await expect(page.locator('h1')).toContainText(/DigiD MOCK/);
        await page.getByRole('link', { name: 'Login / Submit' }).click();

        await expect(page).toHaveURL(/.*zorgaanbieder-toevoegen/);
    });
});
