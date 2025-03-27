import { type Range } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { quantity } from './quantity';

export const range = createMockDataFactory<Range>(() => ({
    low: quantity(),
    high: quantity(),
}));
