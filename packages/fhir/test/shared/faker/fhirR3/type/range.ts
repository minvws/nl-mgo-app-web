import { type Range } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { quantity } from './quantity.js';

export const range = createMockFactory<Range>(() => ({
    low: quantity(),
    high: quantity(),
}));
