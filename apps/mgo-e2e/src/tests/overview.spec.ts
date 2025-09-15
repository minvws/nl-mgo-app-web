import { HealthCategory } from '@minvws/mgo';
import { expect, test } from '../setup';
import { setOnboardingSeen } from '../utils';

test('User can visit the overview page which shows health categories when an organization has been added', async ({
    page,
    pageLogin,
    pageOverview,
    pageAddOrganization,
    pageAddOrganizationList,
}) => {
    await test.step('Mark onboarding as seen', async () => {
        await setOnboardingSeen(page);
    });

    await test.step('Login using DigiD', async () => {
        await pageLogin.goto();
        await pageLogin.loginDigid();
    });

    await test.step('Navigate to overview page and verify no organizations message', async () => {
        await pageOverview.goto();
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeVisible();
        await pageOverview.buttonAddOrganization.click();
    });

    await test.step('Search and add organization', async () => {
        await expect(pageAddOrganization.heading).toBeVisible();
        await pageAddOrganization.search('test', 'test');
        await pageAddOrganization.addOrganization('Kwalificatie Medmij: BGZ');
    });

    await test.step('Verify added organization and navigate back to overview', async () => {
        await expect(pageAddOrganizationList.heading).toBeVisible();
        await expect(
            pageAddOrganizationList.organizationListItem('Kwalificatie Medmij: BGZ')
        ).toBeVisible();
        await pageAddOrganizationList.buttonToOverview.click();
    });

    await test.step('Verify health categories on overview page', async () => {
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeHidden();
        await expect(
            pageOverview.buttonHealthCategory(HealthCategory.PersonalInformation)
        ).toBeVisible();
    });
});
