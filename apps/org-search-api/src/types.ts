/* v8 ignore start */

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

export type SearchResults = {
    /**
     * The number of all the matched documents.
     */
    count: number;
    /**
     * An array of matched documents taking `limit` and `offset` into account.
     */
    hits: Result<OrganizationItem>[];
};

export type Result<Document> = {
    /**
     * The id of the document.
     */
    id: string;
    /**
     * The score of the document in the search.
     */
    score: number;
    /**
     * The document
     */
    document: Document;
};
