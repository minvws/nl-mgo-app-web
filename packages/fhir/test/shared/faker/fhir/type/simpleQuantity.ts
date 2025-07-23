import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Quantity } from 'fhir/r3';
import { quantity } from './quantity';

export const simpleQuantity = createMockFactory<Omit<Quantity, 'comparator'>>(() => {
    const quantityValue = quantity();
    const { comparator: _, ...rest } = quantityValue;
    return rest;
});
