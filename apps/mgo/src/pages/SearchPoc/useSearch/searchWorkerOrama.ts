/* c8 ignore start - this is only a POC */
/* eslint-disable no-restricted-globals */

import { create, insertMultiple, Orama, search as searchOrama } from '@orama/orama';
import type { OrganizationItem } from './types';

const schema = {
    id: 'string',
    displayName: 'string',
    city: 'string',
} as const;
type OramaSchema = typeof schema;

let db: Orama<OramaSchema> | null = null;

async function createIndex(payload: OrganizationItem[]) {
    db = create({
        schema,
    });

    await insertMultiple(
        db,
        payload.map(
            (item) =>
                ({
                    id: item.id,
                    displayName: item.displayName,
                    city: item.city,
                }) as any
        )
    );
}

async function search(payload: { query: string }) {
    if (!db) {
        console.error('worker :: index not created');
        return [];
    }

    const results = await searchOrama(db, {
        term: payload.query,
        limit: 100,
        tolerance: 1,
        properties: '*',
        boost: {
            displayName: 2,
            city: 1,
        },
    });

    return results.hits.map((result) => result.id);
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
