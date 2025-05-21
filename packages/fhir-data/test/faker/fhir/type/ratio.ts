import { type Ratio } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { quantity } from './quantity';

export const ratio = createMockDataFactory<Ratio>(() => ({
    numerator: quantity(),
    denominator: quantity(),
}));
