import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type ObservationRelated } from 'fhir/r3';
import { reference } from '../type';

export const observationRelated = createMockFactory<ObservationRelated>(() => {
    return {
        target: reference(),
        type: undefined,
    };
});
