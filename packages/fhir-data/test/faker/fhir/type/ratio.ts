import { type Ratio } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { quantity } from './quantity';

export const ratio = createMockDataFactory<Ratio>(() => {
    return mockOptionalFields({
        numerator: quantity(),
        denominator: quantity(),
    });
});
