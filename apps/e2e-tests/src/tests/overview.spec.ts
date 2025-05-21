import { HealthCategory } from '@minvws/mgo-apps-mgo';
import { expect, test } from '../setup';
import { setOnboardingSeen } from '../utils';

test('User can visit the overview page which shows health categories when an organization has been added', async ({
    page,
    pageLogin,
    pageOverview,
    pageAddOrganization,
    pageAddOrganizationList,
}) => {
    await setOnboardingSeen(page);

    await pageLogin.goto();
    await pageLogin.loginDigid();

    await pageOverview.goto();
    await expect(pageOverview.heading).toBeVisible();
    await expect(pageOverview.headingNoOrganizations).toBeVisible();
    await pageOverview.buttonAddOrganization.click();

    await expect(pageAddOrganization.heading).toBeVisible();
    await pageAddOrganization.search('test', 'test');
    await pageAddOrganization.addOrganization('Kwalificatie Medmij: BGZ');

    await expect(pageAddOrganizationList.heading).toBeVisible();
    await expect(
        pageAddOrganizationList.organizationListItem('Kwalificatie Medmij: BGZ')
    ).toBeVisible();
    await pageAddOrganizationList.buttonToOverview.click();

    await expect(pageOverview.heading).toBeVisible();
    await expect(pageOverview.headingNoOrganizations).not.toBeVisible();
    await expect(
        pageOverview.buttonHealthCategory(HealthCategory.PersonalInformation)
    ).toBeVisible();
});
