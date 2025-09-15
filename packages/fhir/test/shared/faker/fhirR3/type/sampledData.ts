import { type SampledData } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { decimal } from './decimal.js';
import { positiveInt } from './positiveInt.js';
import { simpleQuantity } from './simpleQuantity.js';
import { string } from './string.js';

export const sampledData = createMockFactory<SampledData>(() => {
    return {
        origin: simpleQuantity(),
        period: decimal(),
        factor: decimal(),
        lowerLimit: decimal(),
        upperLimit: decimal(),
        dimensions: positiveInt(),
        data: string(),
    };
});
