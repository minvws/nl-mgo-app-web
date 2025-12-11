/* c8 ignore start - this is only a POC */
/* eslint-disable no-restricted-globals */

import { create, insertMultiple, Orama, search as searchOrama } from '@orama/orama';
import type { OrganizationItem } from './types';

const schema = {
    id: 'string',
    displayName: 'string',
    careTypeDisplay: 'string',
    aliases: 'string[]',
    addressLine: 'string',
    postalCode: 'string',
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
        payload.map((item) => ({
            id: item.id ?? undefined,
            displayName: item.displayName ?? undefined,
            careTypeDisplay: item.careTypeDisplay ?? undefined,
            aliases: item.aliases ?? undefined,
            addressLine: item.addressLine ?? undefined,
            postalCode: item.postalCode ?? undefined,
            city: item.city ?? undefined,
        }))
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

    // boosExactMatch(payload.query, results);
    return results.hits.map((result) => result.id);
}

// function boosExactMatch(query: string, results: Results<any>) {
//     // Exact match boost
//     const queryRegexp = new RegExp(query, 'i');

//     for (const r of results.hits) {
//         const { document } = r;

//         const inAddress = queryRegexp.test(document.addressLine);
//         const inDisplay = queryRegexp.test(document.displayName);

//         if (inAddress && inDisplay) {
//             r.score *= 2.5;
//         } else if (inAddress) {
//             r.score *= 1.5;
//         } else if (inDisplay) {
//             r.score *= 2;
//         }
//     }

//     results.hits.sort((a, b) => b.score - a.score);

//     return results;
// }

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
