import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Period } from 'fhir/r3';
import { dateTime } from './dateTime.js';

export const period = createMockFactory<Period>(() => ({
    start: dateTime(),
    end: dateTime(),
}));
