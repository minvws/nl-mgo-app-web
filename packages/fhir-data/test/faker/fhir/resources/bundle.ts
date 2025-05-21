import { type Bundle } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code } from '../type';

export const bundle = createMockDataFactory<Bundle>(() => ({
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
