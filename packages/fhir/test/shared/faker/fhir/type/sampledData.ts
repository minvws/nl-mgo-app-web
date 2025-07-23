import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type SampledData } from 'fhir/r3';
import { decimal } from './decimal';
import { positiveInt } from './positiveInt';
import { simpleQuantity } from './simpleQuantity';
import { string } from './string';

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
