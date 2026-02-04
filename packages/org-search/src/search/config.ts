import { Orama, SearchParamsFullText } from '@orama/orama';

import { Organization, organizationOramaSchema } from './schema.js';

export type SearchConfig = Pick<
    SearchParamsFullText<Orama<typeof organizationOramaSchema>, Organization>,
    'tolerance' | 'properties' | 'threshold' | 'boost' | 'relevance'
>;

export const defaultSearchConfig: SearchConfig = {
    tolerance: 1,
    threshold: 0.2,
    properties: ['normalizedDisplayName', 'searchBlob'],
    boost: {
        normalizedDisplayName: 2,
        searchBlob: 1,
    },
};
