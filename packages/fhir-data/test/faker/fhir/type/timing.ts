import { type Timing } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { codeableConcept } from './codeableConcept';
import { dateTime } from './dateTime';
import { timingRepeat } from './timingRepeat';

export const timing = createMockDataFactory<Timing>(() => ({
    code: codeableConcept(),
    event: collection({
        factory: dateTime,
        max: 5,
    }),
    repeat: timingRepeat(),
}));
