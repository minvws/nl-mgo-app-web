import { type ObservationRelated } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { reference } from '../type';

export const observationRelated = createMockDataFactory<ObservationRelated>(() => {
    return {
        target: reference(),
        type: undefined,
    };
});
