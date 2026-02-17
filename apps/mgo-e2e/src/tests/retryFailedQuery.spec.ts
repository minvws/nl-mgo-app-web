import { dataServicesConfig } from '@minvws/mgo-config';
import { expect, test } from '../setup';
import { setOnboardingSeen, useMockOrganizations } from '../utils';

test.use({ checkConsoleMessages: undefined }); // disable console logging assertion
test('Retry a failed query on overview', async ({
    page,
    pageLogin,
    pageOverview,
    pageSearchOrganization,
}) => {
    let blockCcdHealthRequest = true;

    await test.step('Set onboarding seen flag and use mock organizations', async () => {
        await setOnboardingSeen(page);
        await useMockOrganizations(page);
    });

    await test.step('Login with Digid', async () => {
        await pageLogin.goto();
        await pageLogin.loginDigid();
    });

    await test.step('Add organization "Kwalificatie Medmij: BGZ"', async () => {
        await pageSearchOrganization.goto();
        await pageSearchOrganization.search('testtest');

        const firstEndpoint = dataServicesConfig.commonClinicalDataset.endpoints[0];
        await page.route(`**${firstEndpoint.path}`, (route) => {
            if (blockCcdHealthRequest) {
                return route.abort();
            }
            return route.continue();
        });

        await pageSearchOrganization.addOrganization('Kwalificatie Medmij: BGZ');
        await pageOverview.goto();
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
