import { create, insertMultiple, Orama, OramaPlugin, search as searchOrama } from '@orama/orama';

import { pluginQPS } from '@orama/plugin-qps';
import { defaultSearchConfig, SearchConfig } from './config.js';
import { normalizeOrganizationItemDto, removePunctuation } from './normalize.js';
import {
    Organization,
    OrganizationDto,
    organizationOramaSchema,
    SearchResult,
    SearchResults,
} from './schema.js';

export type { Organization, OrganizationDto, SearchResult, SearchResults };

export type SearchIndex = {
    db: Orama<typeof organizationOramaSchema>;
    search: (payload: { query: string }) => Promise<SearchResults>;
};

export interface SearchIndexOptions {
    searchConfig?: SearchConfig;
}

export async function createSearchIndex(
    payload: OrganizationDto[],
    { searchConfig }: SearchIndexOptions = {}
): Promise<SearchIndex> {
    const config = searchConfig ?? { ...defaultSearchConfig };
    const plugins: OramaPlugin[] = [
        // https://docs.orama.com/docs/orama-js/search/changing-default-search-algorithm
        pluginQPS(),
    ];

    const db = create({ schema: organizationOramaSchema, plugins });
    await insertMultiple(db, payload.map(normalizeOrganizationItemDto));

    async function search(payload: { query: string }): Promise<SearchResults> {
        return await searchOrama(db, {
            term: removePunctuation(payload.query),
            limit: 100,
            ...config,
        });
    }

    return { db, search };
}
