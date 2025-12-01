/* c8 ignore start - this is only a POC */
/* eslint-disable no-restricted-globals */

import Fuse from 'fuse.js';
import type { OrganizationItem } from './types';

let index: Fuse<Pick<OrganizationItem, 'displayName' | 'city' | 'id'>> | null = null;

function createIndex(payload: OrganizationItem[]) {
    const items = payload.map((item) => ({
        id: item.id,
        displayName: item.displayName,
        city: item.city,
    }));

    index = new Fuse(items, {
        keys: [
            {
                name: 'displayName',
                weight: 2,
            },
            {
                name: 'city',
                weight: 1,
            },
        ],
    });
}

async function search(payload: { query: string }) {
    if (!index) {
        console.error('worker :: index not created');
        return [];
    }
    const result = await index.search(payload.query, { limit: 100 });
    return result.map((result) => result.item.id);
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
