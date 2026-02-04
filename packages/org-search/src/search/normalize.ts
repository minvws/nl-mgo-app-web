import { Nullable } from '@minvws/mgo-utils';
import { Organization, OrganizationDto } from './schema.js';

export const removePunctuation = (text: Nullable<string>) => {
    return text?.replace(/[.]/g, '').replace(/\s+/g, ' ').trim();
};

export function normalizeOrganizationItemDto(item: OrganizationDto): Organization {
    return {
        id: item.id,
        displayName: item.display_name ?? undefined,
        normalizedDisplayName: removePunctuation(item.display_name),
        careTypeDisplay: item.care_type_display ?? undefined,
        addressLine: item.address_line ?? undefined,
        postalCode: item.postal_code ?? undefined,
        city: item.city ?? undefined,
        geoLat: item.geo_lat ?? undefined,
        geoLng: item.geo_lng ?? undefined,
        searchBlob: removePunctuation(item.search_blob),
    };
}
