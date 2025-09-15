import { type Period } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { dateTime } from './dateTime.js';

export const period = createMockFactory<Period>(() => ({
    start: dateTime(),
    end: dateTime(),
}));
