import { fhirMessage } from '@minvws/mgo-intl/test/shared';
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
    await test.step('Set onboarding seen flag', async () => {
        await setOnboardingSeen(page);
    });

    await test.step('Login with Digid', async () => {
        await pageLogin.goto();
        await pageLogin.loginDigid();
    });

    await test.step('Add organization "Kwalificatie Medmij: BGZ"', async () => {
        await pageAddOrganization.goto();
        await pageAddOrganization.search('test', 'test');
        await pageAddOrganization.addOrganization('Kwalificatie Medmij: BGZ');
    });

    await test.step('Verify organization added and return to overview', async () => {
        await expect(pageAddOrganizationList.heading).toBeVisible();
        await pageAddOrganizationList.buttonToOverview.click();
    });

    await test.step('Verify overview page and open Medication health category', async () => {
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeHidden();
        await pageOverview.buttonHealthCategory('medication').click();
    });

    await test.step('Verify medication health category and select medication', async () => {
        await expect(pageHealthCategory.heading('medication')).toBeVisible();
        const medicationUseList = pageHealthCategory.subCategoryList('zib_medication_use');

        await expect(medicationUseList).toBeVisible();
        await medicationUseList
            .getByRole('listitem')
            .filter({ hasText: 'Zestril tablet 10mg' })
            .click();
    });

    await test.step('Verify medication summary and match snapshot', async () => {
        await expect(pageHealthDataSummary.heading('Zestril tablet 10mg')).toBeVisible();
        const dataListSummary = await pageHealthDataSummary.getDataListContentsJson();
        await expect(dataListSummary).toMatchSnapshot('medication-use-summary.json');
    });

    await test.step('Open medication details and match snapshot', async () => {
        await pageHealthDataSummary.buttonDetails('r3.zib_medication_use').click();
        await expect(
            pageHealthDataDetail.heading(fhirMessage('r3.zib_medication_use'))
        ).toBeVisible();
        const dataListDetail = await pageHealthDataDetail.getDataListContentsJson();
        await expect(dataListDetail).toMatchSnapshot('medication-use-details.json');
    });
});
