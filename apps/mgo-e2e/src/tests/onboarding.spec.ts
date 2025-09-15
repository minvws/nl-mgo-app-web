import { appMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from '../setup';

test('User goes through the onboarding flow and visits the privacy statement', async ({
    page,
    pageIntroduction,
    pageProposition,
    pagePrivacyStatement,
    pageLogin,
}) => {
    await test.step('Open home page and check title', async () => {
        await page.goto('/');
        const pageTitle = await page.title();
        expect(pageTitle).toContain(appMessage('common.app_name'));
    });

    await test.step('Verify introduction page and continue', async () => {
        await expect(pageIntroduction.heading).toBeVisible();
        await pageIntroduction.buttonContinue.click();
    });

    await test.step('Verify proposition page and navigate to privacy statement', async () => {
        await expect(pageProposition.heading).toBeVisible();
        await pageProposition.linkPrivacyPage.click();
    });

    await test.step('Verify privacy statement page and navigate back', async () => {
        await expect(pagePrivacyStatement.heading).toBeVisible();
        await pagePrivacyStatement.buttonBack.click();
    });

    await test.step('Back on proposition page, continue to login', async () => {
        await expect(pageProposition.heading).toBeVisible();
        await pageProposition.buttonContinue.click();
    });

    await test.step('Verify login page is visible', async () => {
        await expect(pageLogin.heading).toBeVisible();
    });
});
