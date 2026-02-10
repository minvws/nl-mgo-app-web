import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { normalizeOrganization } from './normalize';

test('normalizeOrganization normalizes an organization by moving the data services into an array', async () => {
    const searchResult = faker.custom.organizationSearchResult();
    const normalized = normalizeOrganization(searchResult);

    expect(normalized.dataServices.length).toBe(Object.keys(searchResult.dataServices!).length);

    for (const dataService of normalized.dataServices) {
        const searchDataServiceEndpoints = searchResult.dataServices![dataService.id];
        expect(dataService).toMatchObject(searchDataServiceEndpoints);
    }
});

test('dataServices defaults to empty array if dataServices is undefined', async () => {
    const searchResult = faker.custom.organizationSearchResult();
    searchResult.dataServices = undefined;
    const normalized = normalizeOrganization(searchResult);

    expect(normalized.dataServices).toEqual([]);
});
