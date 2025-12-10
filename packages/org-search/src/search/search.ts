import {
    create,
    insertMultiple,
    Orama,
    OramaPlugin,
    Results,
    search as searchOrama,
    SearchParamsFullText,
} from '@orama/orama';

import { pluginPT15 } from '@orama/plugin-pt15';
import { pluginQPS } from '@orama/plugin-qps';
import {
    normalizeOrganizationItemDto,
    removePunctuation,
    type OrganizationItem,
    type OrganizationItemDto,
} from './normalize.js';

const schema = {
    id: 'string',
    normalizedDisplayName: 'string',
    careTypeDisplay: 'string',
    aliases: 'string[]',
    addressLine: 'string',
    postalCode: 'string',
    city: 'string',
    qpsSearchBlob: 'string',
    normalizedTypes: 'string[]',
    normalizedName: 'string',
    normalizedAliases: 'string[]',
} as const;

export type SearchIndex = {
    db: Orama<typeof schema>;
    search: (payload: { query: string }) => Promise<SearchResults>;
};

export type SearchResults = Results<OrganizationItem>;
export type SearchResultDocument = OrganizationItem;
export type { OrganizationItem, OrganizationItemDto };

export type SearchConfig = Pick<
    SearchParamsFullText<Orama<typeof schema>, OrganizationItem>,
    'tolerance' | 'properties' | 'threshold' | 'boost' | 'relevance'
>;

export interface CreateSearchIndexOptions {
    searchConfig?: SearchConfig;
    searchAlgorithm?: 'bm25' | 'qps' | 'pt15';
}

const defaultSearchConfig: SearchConfig = {
    tolerance: 1,
    threshold: 0.2,
    properties: ['normalizedDisplayName', 'qpsSearchBlob'],
    boost: {
        normalizedDisplayName: 2,
        qpsSearchBlob: 1,
    },
};

export async function createSearchIndex(
    payload: OrganizationItemDto[],
    { searchConfig, searchAlgorithm }: CreateSearchIndexOptions = {}
) {
    const config = searchConfig ?? { ...defaultSearchConfig };
    const plugins: OramaPlugin[] = [];

    // https://docs.orama.com/docs/orama-js/search/changing-default-search-algorithm
    switch (searchAlgorithm) {
        case 'pt15':
            plugins.push(pluginPT15());
            config.tolerance = 0; // pt15 only supports 0 tolerance
            break;
        case 'bm25':
            // bm25 is the default search algorithm
            break;
        case 'qps':
        default:
            plugins.push(pluginQPS());
            break;
    }

    const db = create({ schema, plugins });

    await insertMultiple(db, payload.map(normalizeOrganizationItemDto));

    async function search(payload: { query: string }) {
        return await searchOrama(db, {
            term: removePunctuation(payload.query),
            limit: 100,
            ...config,
        });
    }

    return { db, search } as SearchIndex;
}
