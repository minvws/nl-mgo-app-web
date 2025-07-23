import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type ImmunizationPractitioner } from 'fhir/r3';
import { reference } from '../type/index.js';

export const immunizationPractitioner = createMockFactory<ImmunizationPractitioner>(() => {
    return {
        actor: reference(),
    };
});
