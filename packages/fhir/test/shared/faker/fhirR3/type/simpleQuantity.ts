import { type Quantity } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { quantity } from './quantity.js';

export const simpleQuantity = createMockFactory<Omit<Quantity, 'comparator'>>(() => {
    const quantityValue = quantity();
    const { comparator: _, ...rest } = quantityValue;
    return rest;
});
