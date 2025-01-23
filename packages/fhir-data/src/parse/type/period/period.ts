import { type DateTimeString, type Period } from '@minvws/mgo-fhir-types';
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
