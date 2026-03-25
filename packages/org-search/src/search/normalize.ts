import { Nullable } from '@minvws/mgo-utils';
import { DataService, DataServiceDto, Organization, OrganizationDto } from './schema.js';

export const removePunctuation = (text: Nullable<string>) => {
    return text?.replace(/[.]/g, '').replace(/\s+/g, ' ').trim();
};

export function normalizeDataServiceDto(dto: DataServiceDto): DataService {
    return {
        id: dto.id,
        authEndpoint: dto.auth_endpoint,
        tokenEndpoint: dto.token_endpoint,
        resourceEndpoint: dto.resource_endpoint,
    };
}

export function normalizeOrganizationItemDto(item: OrganizationDto): Organization {
    return {
        id: item.id,
        medmijId: item.medmij_id ?? undefined,
        name: item.name ?? undefined,
        normalizedName: removePunctuation(item.name),
        careType: item.care_type ?? undefined,
        address: item.address ?? undefined,
        postalCode: item.postal_code ?? undefined,
        city: item.city ?? undefined,
        geoLat: item.geo_lat ?? undefined,
        geoLng: item.geo_lng ?? undefined,
        searchBlob: removePunctuation(item.search_blob),
        dataServices: item.data_services?.map(normalizeDataServiceDto),
    };
}
