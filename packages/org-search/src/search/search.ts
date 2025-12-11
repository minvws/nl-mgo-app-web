import { create, insertMultiple, Orama, Results, search as searchOrama } from '@orama/orama';

const schema = {
    id: 'string',
    displayName: 'string',
    careTypeDisplay: 'string',
    aliases: 'string[]',
    addressLine: 'string',
    postalCode: 'string',
    city: 'string',
} as const;

export interface OrganizationItem {
    id: string;
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

export type SearchIndex = {
    db: Orama<typeof schema>;
    search: (payload: { query: string }) => Promise<SearchResults>;
};
export type SearchResults = Results<OrganizationItem>;
export type SearchResultDocument = OrganizationItem;

export async function createSearchIndex(payload: OrganizationItem[]) {
    const db = create({
        schema,
    });

    await insertMultiple(
        db,
        payload.map((item) => ({
            id: item.id,
            displayName: item.displayName ?? undefined,
            careTypeDisplay: item.careTypeDisplay ?? undefined,
            aliases: item.aliases ?? undefined,
            addressLine: item.addressLine ?? undefined,
            postalCode: item.postalCode ?? undefined,
            city: item.city ?? undefined,
        }))
    );

    async function search(payload: { query: string }) {
        return await searchOrama(db, {
            term: payload.query,
            limit: 100,
            tolerance: 0,
            properties: '*',
            threshold: 0.2,
            boost: {
                displayName: 3,
                aliases: 2,
                addressLine: 1,
                careTypeDisplay: 1.5,
                city: 3.5,
                postalCode: 1,
            },
        });
    }

    return { db, search } as SearchIndex;
}
