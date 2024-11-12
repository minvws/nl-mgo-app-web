import { type ImmunizationPractitioner } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { reference } from '../type';

export const immunizationPractitioner = createMockDataFactory<ImmunizationPractitioner>(() => {
    return {
        actor: reference(),
    };
});
