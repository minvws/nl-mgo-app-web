/* c8 ignore start - this is only a POC */
export type EventType = 'add' | 'search';

export interface OrganizationItem {
    id: string;
    agbCode: string | null;
    displayName: string;
    legalName: string | null;
    aliases: string[] | null;
    careTypeDisplay: string | null;
    city: string | null;
    postalCode: string | null;
    addressLine: string | null;
    geoLat: number | null;
    geoLng: number | null;
}
