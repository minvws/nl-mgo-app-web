/* c8 ignore start - this is only a POC */
/* eslint-disable no-restricted-globals */

import { Index } from 'flexsearch';
import type { OrganizationItem } from './types';

let index: Index | null = null;

function createIndex(payload: OrganizationItem[]) {
    index = new Index({
        // tokenize: 'forward',
        // tokenize: 'tolerant',
        tokenize: 'bidirectional',
    });

    for (let i = 0; i < payload.length; i++) {
        const item = payload[i];
        index.add(item.id, `${item.displayName} ${item.city}`);
    }
}

async function search(payload: { query: string }) {
    if (!index) {
        console.error('worker :: index not created');
        return [];
    }
    const result = await index.search({ query: payload.query, suggest: true, limit: 100 });
    return result;
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

    self.postMessage({ type: `${requestType}-response`, payload, requestId });
};
