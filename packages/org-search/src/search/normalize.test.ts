import { expect, test } from 'vitest';
import { faker } from '../../test/index.js';
import { normalizeOrganizationItemDto } from './normalize.js';

test('converts a organization dto to a organization item', async () => {
    const organization = faker.custom.organizationDto();
    organization.display_name = `${faker.string.alpha()}.${faker.string.alpha()} ${faker.lorem.word()}`;
    const item = normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
    expect(item.displayName).toBe(organization.display_name);
    expect(item.normalizedDisplayName).toBe(organization.display_name.replace('.', ''));
});

test('can handle objects with undefined values', async () => {
    const organization = faker.custom.organizationDto();
    organization.display_name = undefined;
    organization.care_type_display = undefined;
    organization.city = undefined;
    organization.postal_code = undefined;
    organization.address_line = undefined;
    organization.geo_lat = undefined;
    organization.geo_lng = undefined;
    organization.data_services = undefined;
    (organization as any).search_blob = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
    const item = await normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
});

test('can handle data services', async () => {
    const organization = faker.custom.organizationDto();
    organization.data_services = {
        '1': {
            auth_endpoint: faker.internet.url(),
            token_endpoint: faker.internet.url(),
            resource_endpoint: faker.internet.url(),
        },
    };
    const item = await normalizeOrganizationItemDto(organization);
    const dataServiceDto = organization.data_services['1'];
    const dataService = item.dataServices!['1'];
    expect(dataService).toBeDefined();
    expect(dataService.authEndpoint).toBe(dataServiceDto.auth_endpoint);
    expect(dataService.tokenEndpoint).toBe(dataServiceDto.token_endpoint);
    expect(dataService.resourceEndpoint).toBe(dataServiceDto.resource_endpoint);
});
