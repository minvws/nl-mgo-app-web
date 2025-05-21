import { type DateTimeString, type Period } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoPeriod extends ValueType<'period'> {
    start: DateTimeString | undefined;
    end: DateTimeString | undefined;
}

export const period = createTypeParser<Period, MgoPeriod>((value) => {
    const { start, end } = value;
    return {
        _type: 'period',
        start: start as DateTimeString,
        end: end as DateTimeString,
    };
});
