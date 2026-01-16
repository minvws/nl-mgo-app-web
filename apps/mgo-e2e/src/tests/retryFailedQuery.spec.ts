import { expect, test } from '../setup';
import { setOnboardingSeen } from '../utils';
import { dataServicesConfig } from '@minvws/mgo-config';

test.use({ checkConsoleMessages: undefined }); // disable console logging assertion
test('Retry a failed query on overview', async ({
    page,
    pageLogin,
    pageOverview,
    pageAddOrganization,
    pageAddOrganizationList,
}) => {
    let blockCcdHealthRequest = true;

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

    await test.step('Verify organization added and return to overview but with failed request', async () => {
        const firstEndpoint = dataServicesConfig.commonClinicalDataset.endpoints[0];

        await page.route(`**${firstEndpoint.path}`, (route) => {
            if (blockCcdHealthRequest) {
                return route.abort();
            }
            return route.continue();
        });

        await expect(pageAddOrganizationList.heading).toBeVisible();
        await pageAddOrganizationList.buttonToOverview.click();
    });

    await test.step('Verify overview page and retry failed query', async () => {
        await expect(pageOverview.heading).toBeVisible();
        await expect(pageOverview.headingNoOrganizations).toBeHidden();

        await expect(pageOverview.failedRequestHeading).toBeVisible();
        await expect(pageOverview.buttonRetryFailedRequests).toBeVisible();

        blockCcdHealthRequest = false; // reset so we can retry the request
        await pageOverview.buttonRetryFailedRequests.click();
        await expect(pageOverview.failedRequestHeading).toBeHidden();
        await expect(pageOverview.buttonRetryFailedRequests).toBeHidden();
    });
});
