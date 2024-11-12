import { type Bundle } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { code } from '../type';

export const bundle = createMockDataFactory<Bundle>(() => {
    return mockOptionalFields(
        {
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
            ]),
        },
        ['resourceType', 'type']
    );
});
