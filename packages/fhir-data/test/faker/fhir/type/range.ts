import { type Range } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { quantity } from './quantity';

export const range = createMockDataFactory<Range>(() => {
    return mockOptionalFields({
        low: quantity(),
        high: quantity(),
    });
});
