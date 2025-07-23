import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type Timing } from 'fhir/r3';
import { codeableConcept } from './codeableConcept';
import { dateTime } from './dateTime';
import { timingRepeat } from './timingRepeat';

export const timing = createMockFactory<Timing>(() => ({
    code: codeableConcept(),
    event: mockArray({
        factory: dateTime,
        max: 5,
    }),
    repeat: timingRepeat(),
}));
