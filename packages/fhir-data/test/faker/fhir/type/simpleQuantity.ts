import { type Quantity } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { quantity } from './quantity';

export const simpleQuantity = createMockDataFactory<Omit<Quantity, 'comparator'>>(() => {
    const quantityValue = quantity();
    const { comparator: _, ...rest } = quantityValue;
    return rest;
});
