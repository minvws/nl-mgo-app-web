import { HealthCategory } from '@minvws/mgo-apps-mgo';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from '../setup';
import { setOnboardingSeen } from '../utils';

test('User can see their medication use details', async ({
    page,
    pageLogin,
    pageOverview,
    pageAddOrganization,
    pageAddOrganizationList,
    pageHealthCategory,
    pageHealthDataSummary,
    pageHealthDataDetail,
}) => {
    await setOnboardingSeen(page);

    await pageLogin.goto();
    await pageLogin.loginDigid();

    await pageAddOrganization.goto();
    await pageAddOrganization.search('test', 'test');
    await pageAddOrganization.addOrganization('Kwalificatie Medmij: BGZ');

    await expect(pageAddOrganizationList.heading).toBeVisible();
    await pageAddOrganizationList.buttonToOverview.click();

    await expect(pageOverview.heading).toBeVisible();
    await expect(pageOverview.headingNoOrganizations).not.toBeVisible();
    await pageOverview.buttonHealthCategory(HealthCategory.Medication).click();

    await expect(pageHealthCategory.heading(HealthCategory.Medication)).toBeVisible();
    const medicationUseList = pageHealthCategory.categoryList(
        HealthCategory.Medication,
        'medication_use'
    );
    await expect(medicationUseList).toBeVisible();
    medicationUseList.getByRole('listitem').filter({ hasText: 'Zestril tablet 10mg' }).click();

    await expect(pageHealthDataSummary.heading('Zestril tablet 10mg')).toBeVisible();
    const dataListSummary = await pageHealthDataSummary.getDataListContentsJson();
    await expect(dataListSummary).toMatchSnapshot('medication-use-summary.json');
    await pageHealthDataSummary.buttonDetails('r3.zib_medication_use').click();

    await expect(pageHealthDataDetail.heading(fhirMessage('r3.zib_medication_use'))).toBeVisible();
    const dataListDetail = await pageHealthDataDetail.getDataListContentsJson();
    await expect(dataListDetail).toMatchSnapshot('medication-use-details.json');
});
