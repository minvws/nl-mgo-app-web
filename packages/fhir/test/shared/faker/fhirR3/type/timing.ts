import { type Timing } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { codeableConcept } from './codeableConcept.js';
import { dateTime } from './dateTime.js';
import { timingRepeat } from './timingRepeat.js';

export const timing = createMockFactory<Timing>(() => ({
    code: codeableConcept(),
    event: mockArray({
        factory: dateTime,
        max: 5,
    }),
    repeat: timingRepeat(),
}));
