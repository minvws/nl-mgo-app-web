import { expect, test } from 'vitest';
import { faker } from '../../test/index.js';
import { normalizeOrganizationItemDto } from './normalize.js';

test('converts a organization dto to a organization item', async () => {
    const organization = faker.custom.organizationDto();
    organization.name = `${faker.string.alpha()}.${faker.string.alpha()} ${faker.lorem.word()}`;
    const item = normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
    expect(item.name).toBe(organization.name);
    expect(item.normalizedName).toBe(organization.name.replace('.', ''));
});

test('can handle objects with undefined values', async () => {
    const organization = faker.custom.organizationDto();
    organization.name = undefined;
    organization.care_type = undefined;
    organization.city = undefined;
    organization.postal_code = undefined;
    organization.address = undefined;
    organization.geo_lat = undefined;
    organization.geo_lng = undefined;
    organization.data_services = undefined;
    (organization as any).search_blob = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
    const item = await normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
});

test('can handle data services', async () => {
    const organization = faker.custom.organizationDto();
    const dataServiceDto = {
        id: faker.string.uuid(),
        auth_endpoint: faker.internet.url(),
        token_endpoint: faker.internet.url(),
        resource_endpoint: faker.internet.url(),
    };
    organization.data_services = [dataServiceDto];

    const item = await normalizeOrganizationItemDto(organization);
    const dataService = item.dataServices![0];
    expect(dataService).toBeDefined();
    expect(dataService.id).toBe(dataServiceDto.id);
    expect(dataService.authEndpoint).toBe(dataServiceDto.auth_endpoint);
    expect(dataService.tokenEndpoint).toBe(dataServiceDto.token_endpoint);
    expect(dataService.resourceEndpoint).toBe(dataServiceDto.resource_endpoint);
});
