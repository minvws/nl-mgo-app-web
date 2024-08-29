import { type Period } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { dateTime } from './primitive';

export const period = createMockDataFactory<Period>(() => {
    return mockOptionalFields({
        start: dateTime(),
        end: dateTime(),
    });
});
