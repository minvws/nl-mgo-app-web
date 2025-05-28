import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from '../setup';

test('User goes through the onboarding flow and visits the privacy statement', async ({
    page,
    pageIntroduction,
    pageProposition,
    pagePrivacyStatement,
    pageLogin,
}) => {
    await page.goto('/');
    const pageTitle = await page.title();
    await expect(pageTitle).toContain(appMessage('common.app_name'));

    await expect(pageIntroduction.heading).toBeVisible();
    await pageIntroduction.buttonContinue.click();

    await expect(pageProposition.heading).toBeVisible();
    await pageProposition.linkPrivacyPage.click();

    await expect(pagePrivacyStatement.heading).toBeVisible();
    await pagePrivacyStatement.buttonBack.click();

    await expect(pageProposition.heading).toBeVisible();
    await pageProposition.buttonContinue.click();

    await expect(pageLogin.heading).toBeVisible();
});
