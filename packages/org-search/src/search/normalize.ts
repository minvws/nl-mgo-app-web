import { isNonNullish } from '@minvws/mgo-utils';

export interface OrganizationItemDto {
    id: string;
    display_name: string | null;
    normalized_name: string | null;
    aliases: string[] | null;
    normalized_aliases: string[] | null;
    normalized_types: string[] | null;
    care_type_display: string | null;
    city: string | null;
    postal_code: string | null;
    address_line: string | null;
    geo_lat: number | null;
    geo_lng: number | null;
    qps_search_blob: string | null;
}

export interface OrganizationItem {
    id: string;
    displayName: string | undefined;
    normalizedName: string | undefined;
    normalizedDisplayName: string | undefined;
    normalizedAliases: string[] | undefined;
    normalizedTypes: string[] | undefined;
    aliases: string[] | undefined;
    careTypeDisplay: string | undefined;
    city: string | undefined;
    postalCode: string | undefined;
    addressLine: string | undefined;
    geoLat: number | undefined;
    geoLng: number | undefined;
    qpsSearchBlob: string | undefined;
}

export const removePunctuation = (text: string | null) => {
    return text?.replace(/[.]/g, '').replace(/\s+/g, ' ').trim();
};

export function normalizeOrganizationItemDto(item: OrganizationItemDto): OrganizationItem {
    return {
        id: item.id,
        displayName: item.display_name ?? undefined,
        normalizedDisplayName: removePunctuation(item.display_name),
        careTypeDisplay: item.care_type_display ?? undefined,
        aliases: item.aliases
            ? item.aliases.map(removePunctuation).filter(isNonNullish)
            : undefined,
        addressLine: item.address_line ?? undefined,
        normalizedAliases: item.normalized_aliases
            ? item.normalized_aliases.map(removePunctuation).filter(isNonNullish)
            : undefined,
        normalizedTypes: item.normalized_types ?? undefined,
        normalizedName: removePunctuation(item.normalized_name),
        postalCode: item.postal_code ?? undefined,
        city: item.city ?? undefined,
        geoLat: item.geo_lat ?? undefined,
        geoLng: item.geo_lng ?? undefined,
        qpsSearchBlob: removePunctuation(item.qps_search_blob),
    };
}
