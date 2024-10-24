import { type ObservationRelated } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { reference } from '../type';

export const observationRelated = createMockDataFactory<ObservationRelated>(() => {
    return {
        target: reference(),
        type: undefined,
    };
});
