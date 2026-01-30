/* v8 ignore start - this is only a POC */

import { createSearchIndex, SearchIndex } from '../search/search.js';
import type { ResponseType } from './utils.js';

let index: Awaited<SearchIndex>;

export type SearchWorkerFunction = typeof search;
export type CreateIndexWorkerFunction = typeof createIndex;

async function createIndex(payload: Parameters<typeof createSearchIndex>[0]) {
    index = await createSearchIndex(payload);
}

async function search(query: string) {
    if (!index) {
        throw new Error('Index not created');
    }
    return await index.search({ query });
}

self.onmessage = async (event: MessageEvent) => {
    const { type: requestType, payload: requestPayload, requestId } = event.data;
    let payload: unknown = null;

    switch (requestType) {
        case 'create-index':
            payload = await createIndex(requestPayload);
            break;
        case 'search':
            payload = await search(requestPayload);
            break;
        default:
            throw new Error(`Unknown event type: ${requestType}`);
    }

    self.postMessage({
        type: `${requestType}-response` satisfies ResponseType<typeof requestType>,
        payload,
        requestId,
    });
};
