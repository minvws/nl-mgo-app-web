import { type Bundle } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code } from '../type/index.js';

export const bundle = createMockFactory<Bundle>(() => ({
    resourceType: 'Bundle' as const,
    type: code([
        'document',
        'message',
        'transaction',
        'transaction-response',
        'batch',
        'batch-response',
        'history',
        'searchset',
        'collection',
    ] as const),
}));
