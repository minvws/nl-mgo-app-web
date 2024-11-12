import { type Period } from '../../../types/FhirRX';
import { type DateTimeString } from '../../../types/Fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { dateTime } from '../dateTime/dateTime';

export interface MgoPeriod {
    start: DateTimeString | undefined;
    end: DateTimeString | undefined;
}

export const period = createTypeParser<Period, MgoPeriod>((value) => {
    const { start, end } = value;
    return {
        start: dateTime(start),
        end: dateTime(end),
    };
});
