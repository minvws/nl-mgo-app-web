/* c8 ignore start - this is only a POC */
/* eslint-disable no-restricted-globals */

import { Document, DocumentData } from 'flexsearch';
import type { OrganizationItem } from './types';

let index: Document | null = null;

function createIndex(payload: OrganizationItem[]) {
    index = new Document({
        tokenize: 'forward',
        // tokenize: 'tolerant',
        // tokenize: 'bidirectional',
        document: {
            id: 'id',
            index: [
                {
                    field: 'displayName',
                },
                {
                    field: 'careTypeDisplay',
                },
                {
                    field: 'addressLine',
                },
                {
                    field: 'postalCode',
                },
                {
                    field: 'city',
                },
            ],
        },
    });

    for (let i = 0; i < payload.length; i++) {
        const item = payload[i];
        index.add(item as unknown as DocumentData);
    }
}

async function search(payload: { query: string }) {
    if (!index) {
        console.error('worker :: index not created');
        return [];
    }
    const results = await index.search({
        query: payload.query,
        suggest: true,
        limit: 100,
    });

    const scores = new Map();
    const fieldScores = {
        displayName: 3,
        careTypeDisplay: 1,
        addressLine: 1,
        postalCode: 1,
        city: 2,
    };

    for (const { field, result } of results) {
        const weight = fieldScores[field as keyof typeof fieldScores];
        for (const id of result) {
            scores.set(id, (scores.get(id) || 0) + weight);
        }
    }

    const final = [...scores].sort((a, b) => b[1] - a[1]).map(([id]) => id);
    return final;
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
