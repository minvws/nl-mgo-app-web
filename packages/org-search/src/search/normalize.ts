import { Nullable } from '@minvws/mgo-utils';
import { DataService, Organization, OrganizationDto } from './schema.js';

export const removePunctuation = (text: Nullable<string>) => {
    return text?.replace(/[.]/g, '').replace(/\s+/g, ' ').trim();
};

export function normalizeOrganizationItemDto(item: OrganizationDto): Organization {
    let dataServices: Record<string, DataService> | undefined = undefined;

    if (item.data_services) {
        dataServices = {};
        for (const [id, service] of Object.entries(item.data_services)) {
            dataServices[id] = {
                authEndpoint: service.auth_endpoint,
                tokenEndpoint: service.token_endpoint,
                resourceEndpoint: service.resource_endpoint,
            };
        }
    }

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
        dataServices,
    };
}
