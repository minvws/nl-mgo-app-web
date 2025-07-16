import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Ratio } from 'fhir/r3';
import { quantity } from './quantity';

export const ratio = createMockFactory<Ratio>(() => ({
    numerator: quantity(),
    denominator: quantity(),
}));
