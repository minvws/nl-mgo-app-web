import { type ObservationRelated } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { reference } from '../type/index.js';

export const observationRelated = createMockFactory<ObservationRelated>(() => {
    return {
        target: reference(),
        type: undefined,
    };
});
