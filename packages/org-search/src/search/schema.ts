import { AnySchema } from '@orama/orama';

export const organizationOramaSchema = {
    id: 'string',
    normalizedName: 'string',
    searchBlob: 'string',
} as const satisfies AnySchema;

export interface DataServiceDto {
    id: string;
    auth_endpoint: string;
    token_endpoint: string;
    resource_endpoint: string;
}

export interface DataService {
    id: string;
    authEndpoint: string;
    tokenEndpoint: string;
    resourceEndpoint: string;
}

export interface OrganizationDto {
    id: string;
    medmij_id?: string | null;
    name?: string | null;
    care_type?: string | null;
    city?: string | null;
    postal_code?: string | null;
    address?: string | null;
    geo_lat?: number | null;
    geo_lng?: number | null;
    search_blob: string | null;
    data_services?: DataServiceDto[];
}

export type Organization = {
    id: string;
    medmijId?: string;
    name?: string;
    careType?: string;
    city?: string;
    postalCode?: string;
    address?: string;
    geoLat?: number;
    geoLng?: number;
    searchBlob?: string;
    dataServices?: DataService[];
    normalizedName?: string;
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
