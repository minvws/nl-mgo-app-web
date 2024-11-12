import { type Period } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { dateTime } from './dateTime';

export const period = createMockDataFactory<Period>(() => {
    return mockOptionalFields({
        start: dateTime(),
        end: dateTime(),
    });
});
