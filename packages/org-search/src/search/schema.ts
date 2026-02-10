import { AnySchema } from '@orama/orama';

export const organizationOramaSchema = {
    id: 'string',
    displayName: 'string',
    normalizedDisplayName: 'string',
    careTypeDisplay: 'string',
    addressLine: 'string',
    postalCode: 'string',
    city: 'string',
    searchBlob: 'string',
} as const satisfies AnySchema;

export interface DataServiceEndpointsDto {
    auth_endpoint: string;
    token_endpoint: string;
    resource_endpoint: string;
}

export interface DataServiceEndpoints {
    authEndpoint: string;
    tokenEndpoint: string;
    resourceEndpoint: string;
}

export interface OrganizationDto {
    id: string;
    display_name?: string | null;
    care_type_display?: string | null;
    city?: string | null;
    postal_code?: string | null;
    address_line?: string | null;
    geo_lat?: number | null;
    geo_lng?: number | null;
    search_blob: string | null;
    data_services?: Record<string, DataServiceEndpointsDto> | null;
}

export type Organization = {
    id: string;
    displayName?: string;
    careTypeDisplay?: string;
    city?: string;
    postalCode?: string;
    addressLine?: string;
    geoLat?: number;
    geoLng?: number;
    searchBlob?: string;
    dataServices?: Record<string, DataServiceEndpoints>;
    normalizedDisplayName?: string;
};

/**
 * We don't use the types from Orama as this does not work
 * well with the JSON schema generation in the org-search-api.
 */
export type SearchResult = {
    id: string;
    score: number;
    document: Organization;
};

export type SearchResults = {
    count: number;
    hits: SearchResult[];
};
