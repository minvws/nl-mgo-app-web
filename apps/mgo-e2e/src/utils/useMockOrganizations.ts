import { type Page } from '@playwright/test';
import mockOrganizations from './mock-organizations.json' with { type: 'json' };

/**
 * This function intercepts the normalized-providers.json request and returns a mock response.
 * This prevents the need to download the full 30+mb file from the server.
 */
export async function useMockOrganizations(page: Page) {
    await page.route('**/normalized-providers.json', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockOrganizations),
        });
    });
}
