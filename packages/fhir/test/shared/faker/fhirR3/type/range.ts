import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Range } from 'fhir/r3';
import { quantity } from './quantity.js';

export const range = createMockFactory<Range>(() => ({
    low: quantity(),
    high: quantity(),
}));
