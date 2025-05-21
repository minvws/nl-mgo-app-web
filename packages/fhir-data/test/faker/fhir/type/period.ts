import { type Period } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { dateTime } from './dateTime';

export const period = createMockDataFactory<Period>(() => ({
    start: dateTime(),
    end: dateTime(),
}));
