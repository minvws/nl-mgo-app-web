import { expect, test } from '../setup';
import { setOnboardingSeen, useMockOrganizations } from '../utils';
import { runAccessibilityCheck } from '../utils/accessibilityChecker';

test('User can visit the overview page which shows health categories when an organization has been added', async ({
    page,
    pageLogin,
    pageOverview,
    pageSearchOrganization,
    pageOrganizations,
}) => {
    await test.step('Set onboarding seen flag and use mock organizations', async () => {
        await setOnboardingSeen(page);
        await useMockOrganizations(page);
    });

    await test.step('Login using DigiD', async () => {
        await pageLogin.goto();
        await pageLogin.loginDigid();

        await runAccessibilityCheck(pageLogin, 'Login');
    });

    await test.step('Navigate to overview page and verify no organizations message', async () => {
        await pageOverview.goto();
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeVisible();
        await pageOverview.buttonAddOrganization.click();
    });

    await test.step('Search and add organization', async () => {
        await expect(pageSearchOrganization.heading).toBeVisible();
        await pageSearchOrganization.search('testtest');
        await pageSearchOrganization.addOrganization('Kwalificatie Medmij: BGZ');

        await runAccessibilityCheck(pageSearchOrganization, 'Search Organization');
    });

    await test.step('Verify organization added and return to overview', async () => {
        await expect(pageOrganizations.heading).toBeVisible();
        await expect(
            pageOrganizations.buttonOrganization('Kwalificatie Medmij: BGZ')
        ).toBeVisible();
        await pageOverview.goto();
    });

    await test.step('Verify health categories on overview page', async () => {
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeHidden();
        await expect(pageOverview.buttonHealthCategory('patient')).toBeVisible();

        await runAccessibilityCheck(pageOverview, 'Overview');
    });
});
