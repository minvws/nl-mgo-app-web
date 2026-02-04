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
    (organization as any).search_blob = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
    const item = await normalizeOrganizationItemDto(organization);
    expect(item.id).toBe(organization.id);
});
