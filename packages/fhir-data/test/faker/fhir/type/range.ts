import { type Range } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { quantity } from './quantity';

export const range = createMockDataFactory<Range>(() => {
    return mockOptionalFields({
        low: quantity(),
        high: quantity(),
    });
});
