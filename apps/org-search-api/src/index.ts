/* v8 ignore start */

import {
    createSearchIndex as createSearchIndexFn,
    type OrganizationDto,
    type SearchIndex,
} from '@minvws/mgo-org-search';
import { createJsonApi } from '@minvws/mgo-utils';

let index: SearchIndex;

export async function createSearchIndex(payload: OrganizationDto[]) {
    index = await createSearchIndexFn(payload);
}

export async function search(query: string) {
    if (!index) {
        throw new Error('Index not ready');
    }
    return await index.search({ query });
}

export const createSearchIndexJson = createJsonApi(createSearchIndex);

export const searchJson = createJsonApi(search);
