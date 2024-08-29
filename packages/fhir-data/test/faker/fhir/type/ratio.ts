import { type Ratio } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { quantity } from './quantity';

export const ratio = createMockDataFactory<Ratio>(() => {
    return mockOptionalFields({
        numerator: quantity(),
        denominator: quantity(),
    });
});
