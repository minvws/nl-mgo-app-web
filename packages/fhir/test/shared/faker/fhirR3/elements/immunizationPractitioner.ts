import { type ImmunizationPractitioner } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { reference } from '../type/index.js';

export const immunizationPractitioner = createMockFactory<ImmunizationPractitioner>(() => {
    return {
        actor: reference(),
    };
});
