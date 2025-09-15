import { type Ratio } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { quantity } from './quantity.js';

export const ratio = createMockFactory<Ratio>(() => ({
    numerator: quantity(),
    denominator: quantity(),
}));
