import { type ImmunizationPractitioner } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { reference } from '../type';

export const immunizationPractitioner = createMockDataFactory<ImmunizationPractitioner>(() => {
    return {
        actor: reference(),
    };
});
