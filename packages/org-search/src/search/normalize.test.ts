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
    organization.display_name = null;
    organization.aliases = null;
    organization.care_type_display = null;
    organization.city = null;
    organization.postal_code = null;
    organization.address_line = null;
    organization.geo_lat = null;
    organization.geo_lng = null;
    organization.qps_search_blob = null;
    organization.normalized_aliases = null;
    organization.normalized_types = null;
    organization.normalized_name = null;
    const item = await normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
});
